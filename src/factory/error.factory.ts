export default function ErrorFactory(res: any, statusCode: number, errorMessage: string) {
    res.status(statusCode).send({
      status: "error",
      error: errorMessage,
    });
  }