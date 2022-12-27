// Импорты
import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Link as ChakraLink } from "@pankod/refine-chakra-ui";

// Медиа
import Logo from "../../assets/images/logo.png";

export const CustomLogo: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <ChakraLink
            as={Link}
            to="/"
            style={
                collapsed
                    ? { transform: "rotateZ(90deg)", margin: "40px 0 20px" }
                    : undefined
            }
        >
            {collapsed ? (
                <img src={Logo} alt="Refine" width="140px" />
            ) : (
                <img src={Logo} alt="Refine" width="140px" />
            )}
        </ChakraLink>
    );
};
