"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import useGetUsers from "../../hooks/useGetUsers";
import SelectedUserTags from "../SelectedUserTags";
import useCreateConversation from "../../hooks/useCreateConversation";

export default function AddChatModal({ handleClose, open }) {
  const { loading, users } = useGetUsers(open);
  //   const users = [
  //     {
  //       name: "Leslie Alexander",
  //       email: "leslie.alexander@example.com",
  //       role: "Co-Founder / CEO",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //       lastSeen: "3h ago",
  //       lastSeenDateTime: "2023-01-23T13:23Z",
  //     },
  //     {
  //       name: "Michael Foster",
  //       email: "michael.foster@example.com",
  //       role: "Co-Founder / CTO",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //       lastSeen: "3h ago",
  //       lastSeenDateTime: "2023-01-23T13:23Z",
  //     },
  //     {
  //       name: "Dries Vincent",
  //       email: "dries.vincent@example.com",
  //       role: "Business Relations",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //       lastSeen: null,
  //     },
  //     {
  //       name: "Lindsay Walton",
  //       email: "lindsay.walton@example.com",
  //       role: "Front-end Developer",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //       lastSeen: "3h ago",
  //       lastSeenDateTime: "2023-01-23T13:23Z",
  //     },
  //     {
  //       name: "Courtney Henry",
  //       email: "courtney.henry@example.com",
  //       role: "Designer",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //       lastSeen: "3h ago",
  //       lastSeenDateTime: "2023-01-23T13:23Z",
  //     },
  //     {
  //       name: "Tom Cook",
  //       email: "tom.cook@example.com",
  //       role: "Director of Product",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //       lastSeen: null,
  //     },
  //   ];
  console.log(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState();
  const { createConversation } = useCreateConversation();

  useEffect(() => {
    if (users.length > 0) {
      setListUsers(users);
    }
  }, [users]);
  useEffect(() => {
    const regex = new RegExp(searchTerm.toLowerCase());
    const temp = [...users].filter((i) =>
      regex.test(i.fullName?.toLowerCase())
    );
    setListUsers(temp);
  }, [searchTerm]);

  const handleCloseModal = () => {
    setSelectedUsers([]);
    handleClose();
    setGroupName();
    setSearchTerm("")
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
  };
  const handleSelectUser = (person) => {
    if (![...selectedUsers].some((i) => i._id == person._id)) {
      setSelectedUsers([...selectedUsers, person]);
    }
  };
  const handleRemoveUser = (person) => {
    const temp = [...selectedUsers].filter((i) => i._id != person._id);
    setSelectedUsers([...temp]);
  };
  const handleCreateConversation = async () => {
    const result = await createConversation(
      [...selectedUsers].map((i) => i._id),
      groupName
    );
    handleCloseModal();
    // console.log(result);
  };

  return (
    <Dialog open={open} onClose={handleCloseModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-gray-300 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-gray-300 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ChatBubbleLeftRightIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div
                  style={{ width: "100%" }}
                  className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"
                >
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Start new conversation
                  </DialogTitle>
                  <div className="mt-2">
                    <div>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                        <input
                          id="users"
                          name="users"
                          type="text"
                          placeholder="Select users"
                          value={searchTerm}
                          onChange={handleSearch}
                          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {selectedUsers.length > 1 && (
                          <div className="my-2 group-name-input-box">
                            <label className="text-gray-900">Group name:</label>
                            <input
                              id="groupName"
                              name="groupName"
                              type="text"
                              placeholder="Enter group name"
                              value={groupName}
                              onChange={(e) => setGroupName(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        )}

                        <SelectedUserTags
                          selectedUsers={selectedUsers}
                          handleRemoveUser={handleRemoveUser}
                        />
                        <ul
                          role="list"
                          style={{ maxHeight: "50vh", overflow: "auto" }}
                          className="divide-y divide-gray-100"
                        >
                          {listUsers.map(
                            (person) =>
                              ![...selectedUsers].some(
                                (i) => i._id == person._id
                              ) && (
                                <li
                                  key={person._id}
                                  className="flex justify-between gap-x-6 py-5 hover:bg-gray-200"
                                  onClick={() => handleSelectUser(person)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <div className="flex min-w-0 gap-x-4">
                                    <img
                                      alt=""
                                      src={person.profilePic}
                                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                    />
                                    <div className="min-w-0 flex-auto">
                                      <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {person.fullName}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleCreateConversation}
                className="inline-flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 sm:ml-3 sm:w-auto"
              >
                Start
              </button>
              <button
                type="button"
                data-autofocus
                onClick={handleCloseModal}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
