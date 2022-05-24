import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

export function withSSRAuth<P>(fn:GetServerSideProps<P>){
  return async (ctx:GetServerSidePropsContext ): Promise<GetServerSidePropsResult<P>>=>{
          // console.log(ctx.req.cookies)
  const cookie = parseCookies(ctx)

  if(!cookie['nextauth.token']){
      return{
        redirect:{
          destination:'/',
          permanent:false,
        }
      }
    }

    try{
      
    return await fn(ctx)

    }catch(error){
        if(error instanceof AuthTokenError){
        console.log(error instanceof AuthTokenError)
        destroyCookie(ctx,'nextauth.token')
        destroyCookie(ctx,'nextauth.refreshToken')
      
        return{
          redirect:{
            destination:'/',
            permanent:false
          }
        }
      }
    }
  }
}