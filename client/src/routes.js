import {
    ADMIN_ROUTE,
    USER_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    CHECK_CODE_ROUTE,
    REGISTRATION_SUCCESS_ROUTE, INDEX_ROUTE,
} from "./utils/consts";
import Auth from "./pages/Auth";
import UserAccount from "./pages/UserAccount";
import CheckCode from "./pages/CheckCode";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import AdminAccount from "./pages/AdminAccount";


export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminAccount
    }
]

export const authRoutes = [
    {
        path: USER_ROUTE,
        Component: UserAccount
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: CHECK_CODE_ROUTE,
        Component: CheckCode
    },
    {
        path: REGISTRATION_SUCCESS_ROUTE,
        Component: RegistrationSuccess
    },
    {
        path: INDEX_ROUTE,
        Component: Auth
    }
]