// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Student2 from 'src/components/Student2/Student2';
import Teacher2 from 'src/components/Teacher2/Teacher2';
import routhPath from 'src/constant/routePath';
import Dashboard from 'src/features/Dashboard/Dashboard';
import Landing from 'src/features/Landing/Landing';
import SignIn from 'src/features/SignIn';
import SignUp from 'src/features/SignUp';

export const routers = {
  signIn: {
    path: routhPath.SIGN_IN,
    element: SignIn
  },
  signUp: {
    path: routhPath.SIGN_UP,
    element: SignUp
  },
  dashboard: {
    path: routhPath.DASHBOARD,
    element: Dashboard
  },
  landing: {
    path: routhPath.LANDING,
    element: Landing
  },
  teacher: {
    path: routhPath.TEACHER,
    element: Teacher2
  },
  student: {
    path: routhPath.STUDENT,
    element: Student2
  }
};
