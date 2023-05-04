import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { UserContext } from "./UserContext";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Badge from "@mui/material/Badge";
import { uuid } from "uuidv4";
import Loading from "./Loading";

type NavbarProps = {
  profileImage: string
  test: string
  cart: any
  setCart: any
}

const pages = ["Store", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];




export default function Navbar() {
  const router = useRouter();
  const { cart, setCart } = useContext(UserContext);
  const { data: session } = useSession();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [profileImage, setProfileImage] = useState("");


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  ///Handles going to other pages as well
  const handleCloseNavMenu = (pageName: string) => {
    setAnchorElNav(null);
    goToRoute(pageName);
  };

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    console.log(setting);
    if (setting === "Profile") {
      goToRoute(setting);
    }

    if (setting === "Logout") {
      signOut();
    }
  };

  function goToRoute(routePath: string) {
    router.push(`/${routePath}`);
  }

  // function openCartContainer() {
  //   props.setShowCartModal((prev: any) => !prev);
  // }



  useEffect(() => {
    ///Gets profile image
    if (session) {
      if (session.user) {
        if (session.user.image) {
          setProfileImage(session.user.image);
        }
      }
    }
  }, [session]);

  if (!cart) setCart([]);
  if (!cart) return null;

  return (
    <AppBar style={{ backgroundColor: "#19376D" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",

              "&:hover": {
                cursor: "pointer"
              }
            }}
          >
            E-Commerce
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => { handleCloseNavMenu(""); }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link key={uuid()} href={`/${page}`}>
                  <MenuItem key={page} onClick={() => { handleCloseNavMenu(page); }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",

              "&:hover": {
                cursor: "pointer"
              }
            }}
          >
            E-Commerce
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={uuid()} href={`/${page}`}>
                <Button
                  key={page}
                  onClick={() => { handleCloseNavMenu(page); }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          {/* style={{ backgroundColor: "#576CBC" }} */}
          <Badge
            onClick={() => { goToRoute("Cart"); }}
            sx={{
              "& .MuiBadge-badge": {
                color: "#A5D7E8",
                backgroundColor: "#576CBC"
              },
              "&:hover": {
                cursor: "pointer",
                borderRadius: 1,
                borderColor: "red",
                borderStyle: "solid",
                borderWidth: 1,
                width: 25
              }
            }}
            badgeContent={cart.length}
            color="error">
            <ShoppingCartIcon color='action' />
          </Badge>


          <Box sx={{ marginLeft: 3, flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={profileImage.length > 0 ? profileImage : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => { handleCloseUserMenu(setting); }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}