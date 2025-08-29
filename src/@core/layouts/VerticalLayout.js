// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Theme Config Import
import themeConfig from "src/configs/themeConfig";

// ** Components
import AppBar from "./components/vertical/appBar";
import Customizer from "src/@core/components/customizer";
import Navigation from "./components/vertical/navigation";
import Footer from "./components/shared-components/footer";
import ScrollToTop from "src/@core/components/scroll-to-top";
import WhatsAppButton from "../components/whatsapp-button";

const VerticalLayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
});

const MainContentWrapper = styled(Box)({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const ContentWrapper = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(6),
  transition: "padding .25s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const VerticalLayout = (props) => {
  // ** Props
  const {
    hidden,
    settings,
    children,
    scrollToTop,
    footerProps,
    contentHeightFixed,
    verticalLayoutProps,
  } = props;

  // ** Vars
  const { skin, navHidden, contentWidth } = settings;
  const navigationBorderWidth = skin === "bordered" ? 1 : 0;
  const { navigationSize, disableCustomizer, collapsedNavigationSize } = themeConfig;
  const navWidth = navigationSize;
  const collapsedNavWidth = collapsedNavigationSize;

  // ** States
  const [navVisible, setNavVisible] = useState(false);

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible);

  return (
    <>
      <VerticalLayoutWrapper className="layout-wrapper">
        {/* Navigation Menu */}
        {navHidden && !(navHidden && settings.lastLayout === "horizontal") ? null : (
          <Navigation
            navWidth={navWidth}
            navVisible={navVisible}
            setNavVisible={setNavVisible}
            collapsedNavWidth={collapsedNavWidth}
            toggleNavVisibility={toggleNavVisibility}
            navigationBorderWidth={navigationBorderWidth}
            navMenuContent={verticalLayoutProps.navMenu.content}
            navMenuBranding={verticalLayoutProps.navMenu.branding}
            menuLockedIcon={verticalLayoutProps.navMenu.lockedIcon}
            verticalNavItems={verticalLayoutProps.navMenu.navItems}
            navMenuProps={verticalLayoutProps.navMenu.componentProps}
            menuUnlockedIcon={verticalLayoutProps.navMenu.unlockedIcon}
            afterNavMenuContent={verticalLayoutProps.navMenu.afterContent}
            beforeNavMenuContent={verticalLayoutProps.navMenu.beforeContent}
            {...props}
          />
        )}
        <MainContentWrapper
          className="layout-content-wrapper"
          sx={{ ...(contentHeightFixed && { maxHeight: "100vh" }) }}
        >
          {/* AppBar Component */}
          <AppBar
            toggleNavVisibility={toggleNavVisibility}
            appBarContent={verticalLayoutProps.appBar?.content}
            appBarProps={verticalLayoutProps.appBar?.componentProps}
            {...props}
          />

          {/* Content */}
          <ContentWrapper
            className="layout-page-content"
            sx={{
              ...(contentHeightFixed && {
                overflow: "hidden",
                "& > :first-of-type": { height: "100%" },
              }),
              ...(contentWidth === "boxed" && {
                mx: "auto",
                "@media (min-width:1440px)": { maxWidth: 1440 },
                "@media (min-width:1200px)": { maxWidth: "100%" },
              }),
            }}
          >
            {children}
          </ContentWrapper>

          {/* Footer Component */}
          {/* <Footer footerStyles={footerProps?.sx} footerContent={footerProps?.content} {...props} /> */}
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {/* Customizer */}
      {/* {disableCustomizer || hidden ? null : <Customizer />} */}

      {/* Scroll to top button */}
      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className="mui-fixed">
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <Icon icon="tabler:arrow-up" />
          </Fab>
        </ScrollToTop>
      )}

        <WhatsAppButton className="mui-fixed">
          <svg width="31" height="30" class="_96z7 _brandPortalIcon__whatsappLogo" fill="none"><title id="whatsapp-logo">WhatsApp logo</title><path d="M15.565 0C7.057 0 .133 6.669.13 14.865c-.002 2.621.71 5.179 2.06 7.432L0 30l8.183-2.067a15.89 15.89 0 007.376 1.81h.006c8.508 0 15.432-6.67 15.435-14.866.002-3.97-1.602-7.707-4.517-10.516C23.569 1.551 19.694.001 15.565 0zm0 27.232h-.005c-2.302 0-4.56-.596-6.53-1.722l-.47-.268-4.854 1.226 1.296-4.56-.305-.467a11.983 11.983 0 01-1.962-6.576C2.738 8.052 8.494 2.511 15.57 2.511c3.426.001 6.647 1.288 9.07 3.623s3.756 5.44 3.754 8.742c-.003 6.813-5.758 12.356-12.83 12.356zm7.037-9.255c-.386-.185-2.282-1.084-2.636-1.209-.353-.123-.61-.187-.867.185-.256.372-.996 1.209-1.22 1.456-.226.248-.451.278-.837.093-.386-.186-1.629-.578-3.101-1.844-1.147-.984-1.921-2.2-2.146-2.573-.225-.371-.024-.572.169-.757.173-.165.386-.433.578-.65.192-.217.256-.372.386-.62.128-.247.064-.465-.033-.65-.097-.187-.867-2.015-1.19-2.758-.312-.724-.63-.627-.867-.639-.225-.01-.481-.013-.74-.013-.255 0-.674.093-1.028.465-.353.372-1.35 1.27-1.35 3.098 0 1.829 1.382 3.595 1.575 3.843.193.247 2.72 4 6.589 5.61.92.381 1.638.61 2.199.782.924.283 1.765.242 2.429.147.74-.107 2.282-.898 2.602-1.765.322-.867.322-1.611.226-1.766-.094-.155-.352-.248-.738-.435z" fill="currentColor"></path></svg>

        </WhatsAppButton>

    </>
  );
};

export default VerticalLayout;
