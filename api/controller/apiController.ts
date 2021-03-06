// deno-lint-ignore-file
import { insert, listAll, listAllSensor } from "../repository/sensor.ts";

export const home = ({ response }: any) => {
  const res = {
    message: "Welcome to Sensor API",
  };
  response.status = 200;
  response.body = res;
};

export const pageNotFound = ({ response }: any) => {
  const res = {
    message: "This request does not exists.",
  };
  response.status = 404;
  response.body = res;
};

export const sensorList = async ({ response, params }: any) => {
  const sensor_name = await params.sensor_name;
  let sensorList;
  if (sensor_name.trim() === "") {
    sensorList = await listAllSensor();
  } else {
    sensorList = await listAll({ sensor_name });
  }
  const res = {
    message: "Requisition sucessfull.",
    data: sensorList,
  };
  response.status = 200;
  response.body = res;
};

export const sensorListAll = async ({ response }: any) => {
  const sensorList = await listAllSensor();
  const res = {
    message: "Requisition sucessfull.",
    data: sensorList,
  };
  response.status = 200;
  response.body = res;
};

export const insertSensor = async ({ request, response }: any) => {
  const { sensor_name } = await request.body().value;
  const newSensor = await insert(sensor_name);
  const res = {
    message: "Insert sucessfull",
    data: newSensor,
  };
  response.status = 200;
  response.body = res;
};
