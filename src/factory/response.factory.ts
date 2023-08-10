
export default function ResponseFactory(res:any,statuscode:number,message:string,data?:any){
    res.status(statuscode).send({
        status:"success",
        data,
        message,
      });
    };

