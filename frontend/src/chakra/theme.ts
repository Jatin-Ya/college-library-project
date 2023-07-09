import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

export const theme = extendTheme({
  colors,
  components: {
    Text: {
      variants: {
        "content-base": {
          maxW: "60ch",
          color: "gray.600",
          fontWeight: "400",
          fontSize: "14pt",
        },
        "content-head.700": {
          fontSize: "24pt",
          fontWeight: "600",
          color: "gray.700",
        },
        "content-head.500": {
          fontSize: "18pt",
          fontWeight: "600",
          color: "gray.700",
        },
        "content-head.300": {
          fontSize: "14pt",
          fontWeight: "600",
          color: "gray.700",
        },
      },
    },
  },
});
