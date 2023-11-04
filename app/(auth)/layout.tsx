import Image from "next/image";

const AuthLayout = ({ children }: { children : React.ReactNode }) => {
    
    return ( 
        <div className="w-full h-screen flex items-center">
            <div className="w-full h-full flex flex-col p-10">
                <Image
                    className="w-full h-full object-contain"
                    alt="Allemni logo"
                    src="/images/logo_3.png"
                    height={500}
                    width={500}
                />
            </div>
            
            <div className="w-1/2 h-full flex flex-col p-10">
                {children}
            </div>
        </div>
     );
}
 
export default AuthLayout;