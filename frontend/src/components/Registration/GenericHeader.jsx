import "../../styles/RegistrationPage/GenericHeader.css"

const GenericHeader = () => {
    const Logo = "../../images/HomePage/T2R_Logo.png"
    return (
        <>
            <div class = "generic-header">
                <a href = "/"><img src = {Logo} class = "logo"></img></a>
            </div>
        </>
    )
}

export default GenericHeader;
