export default function SelectedUserTags({ selectedUsers, handleRemoveUser }) {
  return (
    selectedUsers.length > 0 && (
      <div style={{ marginTop: "30px" }}>
        <span style={{ color: "#000" }}>Selected Users: </span>
        {selectedUsers.map((i) => (
          <span className="inline-flex items-center rounded-md bg-gray-900 ml-2 px-2 py-1 text-xs hover:bg-gray-700 font-medium text-white-100 ring-1 ring-inset ring-gray-500/10">
            <span style={{ paddingRight: "10px" }}>{i.fullName}</span>
            <span
              style={{
                paddingLeft: "10px",
                borderLeft: "1px solid #fff",
                cursor: "pointer",
              }}
              // className="hover:bg-gray-700"
              onClick={() => handleRemoveUser(i)}
            >
              x
            </span>
          </span>
        ))}
      </div>
    )
  );
}
