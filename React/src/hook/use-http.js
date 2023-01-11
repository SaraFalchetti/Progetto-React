
const useHttp=()=>{

   const sendRequest= async (requestConfig, showData) => {
        const response=await fetch(
          requestConfig.url, {
          method: requestConfig.method ? requestConfig.method :'GET' ,
          body: requestConfig.body? JSON.stringify(requestConfig.body): null,
          headers: requestConfig.headers ? requestConfig.headers : {}
      }
      );
      if(showData){
        const data= await response.json();
        showData(data);  
      };
        
      };

      return{
        sendRequest,
      };
};

export default useHttp;