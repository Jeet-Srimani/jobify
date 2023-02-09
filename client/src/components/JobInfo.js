import Wrapper from "../assets/wrappers/JobInfo";

function JobInfo({icon, text}) {
    return <Wrapper>
        <span className="icon">{icon}</span>
        <span className="icon">{text}</span>
    </Wrapper>
}

export default JobInfo;