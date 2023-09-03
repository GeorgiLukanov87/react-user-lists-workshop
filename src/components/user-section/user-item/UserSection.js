import * as userService from '../../../service/userService'

import { useState, useEffect, useId } from "react";
import { UserItem } from "./UserItem";

import { UserDetail } from "./userDetail";
import { UserEdit } from '../user-edit/UserEdit';
import { UserDelete } from '../user-delete/UserDelete';
import { UserCreate } from '../UserCreate';

const ActionTypes = {
    Details: 'details',
    Edit: 'edit',
    Delete: 'delete',
    Add: 'add',
}

export const UserSection = () => {
    const [users, setUsers] = useState([]);
    const [userAction, setUserAction] = useState({ user: null, action: null });

    useEffect(() => {
        userService.getAll()
            .then(users => setUsers(users))
    }, []);


    const userActionHandler = (userId, actionType) => {
        userService.getOne(userId)
            .then(user => {
                setUserAction({
                    user,
                    action: actionType
                });
            })
    }

    const closeHandler = () => {
        setUserAction({ user: null, action: null })
    }

    const userCreateHandler = (userData) => {
        userService.create(userData)
            .then(user => {
                setUsers(oldUsers => [...oldUsers, user])
                closeHandler();
            });
    }

    const userEditHandler = (e) => {
        e.preventDefault();
        const userId = userAction.user._id

        const editedPerson = document.getElementById('firstName').value
        const editedPhone = document.getElementById('phoneNumber').value

        const newUserData = {
            person: editedPerson,
            phone: editedPhone,
            _id: userId,
        }

        userService.edit(newUserData)
        .then(updatedUser => {
            const userIndex = users.findIndex(user => user._id === userId);
            
            if (userIndex !== -1) {
                const updatedUsers = [...users];
                updatedUsers[userIndex] = updatedUser;
                setUsers(updatedUsers);
            }
            closeHandler();
        });
    }

    const userDeleteHandler = () => {
        const userId = userAction.user._id
        
        userService.remove(userId)
        .then(() => {
            const updatedUsers = users.filter(user => user._id !== userId);
            setUsers(updatedUsers);
            closeHandler();
        });
    }

    return (
        <>
            <div className="table-wrapper">
                {userAction.action === ActionTypes.Details &&
                    <UserDetail
                        user={userAction.user}
                        onClose={closeHandler}
                    />
                }

                {userAction.action === ActionTypes.Edit &&
                    <UserEdit
                        user={userAction.user}
                        onClose={closeHandler}
                        onUserEdit={userEditHandler}
                    />
                }

                {userAction.action === ActionTypes.Delete &&
                    <UserDelete
                        user={userAction.user}
                        onClose={closeHandler}
                        onUserDelete={userDeleteHandler}
                    />
                }

                {userAction.action === ActionTypes.Add &&
                    <UserCreate
                        user={null}
                        onClose={closeHandler}
                        onUserCreate={userCreateHandler}
                    />
                }

                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                First name<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Last name<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Email<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Phone<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Id
                                <svg className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user =>
                            <UserItem
                                key={user._id}
                                user={user}
                                onActionClick={userActionHandler}
                            />
                        )}
                    </tbody>

                </table>
            </div>

            <button className='btn-add btn' onClick={() => userActionHandler(null, ActionTypes.Add)}>Add new user</button>
        </>
    );
}