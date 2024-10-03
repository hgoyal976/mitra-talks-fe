import SearchIcon from "../../searchIcon.svg"
function SearchInput() {

    return <div style={{ display: "flex", alignItems: "center" }}>
        <input style={{ borderRadius: "5px", padding: "6px 10px", width: "20vw", background: "#10002b" }} type="text" placeholder="Search" />
        <button style={{ position: "absolute", right: "480px" }}><img src={SearchIcon} /></button>
    </div>

}
export default SearchInput;