
const useHttp=(requestConfig, showData)=>{

   const sendRequest= async () => {
        const response=await fetch(requestConfig.url);
        const data= await response.json();
        showData(data);   
      };

      return{
        sendRequest,
      };
};

export default useHttp;