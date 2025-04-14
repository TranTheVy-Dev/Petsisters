export const logout = () => {
    if (typeof window === "undefined") {
        console.warn("LocalStorage is not available in this environment.");
        return;
    }
   try {
    localStorage.removeItem('token')
    localStorage.removeItem('customer')
   } catch (error) {
    console.log("khong the logout :",error);
    
   }
}
