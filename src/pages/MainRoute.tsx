import CreatingPost from "../components/CreatingPost";
import Header from "../components/Header";
import MainData from '../components/MainData';

const MainRoute: React.FC = () => {
    return <>
        <Header/>
        <CreatingPost/>
        <MainData/>
    </>;
  };

export default MainRoute;