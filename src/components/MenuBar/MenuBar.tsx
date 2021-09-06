import React, {ReactChildren} from "react";

type LayoutType = {
    children: ReactChildren
}

const MenuBar: React.FC<LayoutType> = ({ children, ...props }) => {

    return (
        <aside>

        </aside>
    )
}

export default MenuBar