import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P>(fn:GetServerSideProps<P>){
  return async (ctx:GetServerSidePropsContext ): Promise<GetServerSidePropsResult<P>>=>{
          // console.log(ctx.req.cookies)
  const cookie = parseCookies(ctx)

  if(cookie['nextauth.token']){
      return{
        redirect:{
          destination:'./dashboard',
          permanent:false,
        }
      }
    }
    return await fn(ctx)
  }
}