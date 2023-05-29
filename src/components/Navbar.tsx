import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { UserContext } from "./UserContext";


type NavbarProps = {
    profileImage: string
    test: string
    cart: any
    setCart: any
}





export default function Navbar() {
    const router = useRouter();
    const { cart, setCart } = useContext(UserContext);
    const { data: session } = useSession();



    const [profileImage, setProfileImage] = useState("");


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
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost normal-case text-xl">Ecommerce</a>
            </div>
            <div className="flex-none">
                <a href="/Store" className="btn btn-ghost normal-case text-xl">Store</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">{cart.length}</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">{cart.length} Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <a href="/Cart"><button className="btn btn-primary btn-block">View cart</button></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={profileImage} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}





{/* <AppBar style={{ backgroundColor: "#19376D" }} position="static">
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
        //             <Badge
        //                 onClick={() => { goToRoute("Cart"); }}
        //                 sx={{
        //                     "& .MuiBadge-badge": {
        //                         color: "#A5D7E8",
        //                         backgroundColor: "#576CBC"
        //                     },
        //                     "&:hover": {
        //                         cursor: "pointer",
        //                         borderRadius: 1,
        //                         borderColor: "red",
        //                         borderStyle: "solid",
        //                         borderWidth: 1,
        //                         width: 25
        //                     }
        //                 }}
        //                 badgeContent={cart.length}
        //                 color="error">
        //                 <ShoppingCartIcon color='action' />
        //             </Badge>


        //             <Box sx={{ marginLeft: 3, flexGrow: 0 }}>
        //                 <Tooltip title="Open settings">
        //                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        //                         <Avatar alt="Remy Sharp" src={profileImage.length > 0 ? profileImage : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"} />
        //                     </IconButton>
        //                 </Tooltip>
        //                 <Menu
        //                     sx={{ mt: "45px" }}
        //                     id="menu-appbar"
        //                     anchorEl={anchorElUser}
        //                     anchorOrigin={{
        //                         vertical: "top",
        //                         horizontal: "right",
        //                     }}
        //                     keepMounted
        //                     transformOrigin={{
        //                         vertical: "top",
        //                         horizontal: "right",
        //                     }}
        //                     open={Boolean(anchorElUser)}
        //                     onClose={handleCloseUserMenu}
        //                 >
        //                     {settings.map((setting) => (
        //                         <MenuItem key={setting} onClick={() => { handleCloseUserMenu(setting); }}>
        //                             <Typography textAlign="center">{setting}</Typography>
        //                         </MenuItem>
        //                     ))}
        //                 </Menu>
        //             </Box>
        //         </Toolbar>
        //     </Container>
        // </AppBar> */}







        // const [settings, setSettings] = useState(["", ""])


        // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        //     setAnchorElNav(event.currentTarget);
        // };
        // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        //     setAnchorElUser(event.currentTarget);
        // };
    
        // ///Handles going to other pages as well
        // const handleCloseNavMenu = (pageName: string) => {
        //     setAnchorElNav(null);
        //     goToRoute(pageName);
        // };
    
        // const handleCloseUserMenu = (setting: string) => {
        //     setAnchorElUser(null);
        //     console.log(setting);
        //     if (setting === "Profile") {
        //         goToRoute(setting);
        //     }
    
        //     if (setting === "Logout") {
        //         signOut();
        //     }
        // };


            // const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    // const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
