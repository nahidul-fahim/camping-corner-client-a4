/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

type TCustomDropdownProps = {
    trigger: ReactNode;
    label?: string;
    menuGroup: any;
    title?: string;
    description?: string;
    children?: ReactNode;
}


const CustomDropdown = ({ trigger, label, menuGroup }: TCustomDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                {/* label */}
                <DropdownMenuLabel>
                    {label}
                </DropdownMenuLabel>

                {/* separator */}
                {label && <DropdownMenuSeparator />}

                {/* dropdown menu */}
                <DropdownMenuGroup>
                    {
                        menuGroup.map((item: any) =>
                            <DropdownMenuItem>
                                <Link to={item?.link}>
                                    {item?.name}
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                </DropdownMenuGroup>

            </DropdownMenuContent>

        </DropdownMenu>
    );
};

export default CustomDropdown;