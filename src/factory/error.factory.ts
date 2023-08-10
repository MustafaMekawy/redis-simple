export default function ErrorFactory(res: any, statusCode: number, errorMessage: any) {
    res.status(statusCode).send({
      status: "error",
      error: errorMessage,
    });
  }