import { appConfig } from "@/config/app";
import { Icons } from "./icons";

export function Logo() {
    return (
        <>
            <Icons.logo className="h-[60px] w-[60px]" />
            {/* <span className="font-bold">{appConfig.name}</span> */}
        </>
    )
}