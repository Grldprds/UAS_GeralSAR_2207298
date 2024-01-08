import React, { Component } from "react";
import UserService from "../services/UserService";
import Modal from "react-modal";
import { FaPlus, FaEdit, FaTrash, FaInfo } from 'react-icons/fa';

class ListUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      showNotification: false,
      search: "",
      isDeleteModalOpen: false,
      userIdToDelete: null,
    };

    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  deleteUser(id) {
    this.openDeleteModal(id);
  }

  openDeleteModal(id) {
    this.setState({
      isDeleteModalOpen: true,
      userIdToDelete: id,
    });
  }

  closeDeleteModal() {
    this.setState({
      isDeleteModalOpen: false,
      userIdToDelete: null,
    });
  }

  confirmDelete() {
    const { userIdToDelete } = this.state;

    UserService.deleteUser(userIdToDelete).then((res) => {
      this.setState({
        users: this.state.users.filter((user) => user.id !== userIdToDelete),
        isDeleteModalOpen: false,
        userIdToDelete: null,
      });
    });
  }

  viewUser(id) {
    this.props.history.push(`/view-user/${id}`);
  }

  editUser(id) {
    this.props.history.push(`/add-user/${id}`);
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  componentDidMount() {
    UserService.getUsers().then((res) => {
      if (res.data === null || res.data.length === 0) {
        this.props.history.push("/add-user/_add");
      } else {
        this.setState({ users: res.data });
      }
    });
  }

  addUser() {
    this.props.history.push("/add-user/_add");
  }

  render() {
    const filteredUsers = this.state.users.filter((user) =>
      user.nama.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <div className="text-center"> {/* Center all the content */}
        <h2 className="pt-5" style={{ fontWeight: "bold", fontSize: "50px", padding: "20px" }}>
          DATA PASIEN PUSKESMAS
        </h2>
        <div className="row">
          <input
            type="text"
            placeholder="Search by name"
            value={this.state.search}
            onChange={this.handleSearchChange}
          />
        </div>
        <div className="row">
          {this.state.showNotification && (
            <div className="notification">
              <span className="notification-checkmark">&#10003;</span>
              <p>Data berhasil diupdate</p>
            </div>
          )}
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Usia</th>
                <th>Jenis Kelamin</th>
                <th>Alamat</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div>{user.nama}</div>
                  </td>
                  <td>
                    <div>{user.usia}</div>
                  </td>
                  <td>
                    <div>{user.jenis_kelamin}</div>
                  </td>
                  <td>
                    <div>{user.alamat}</div>
                  </td>
                  <td>
                    <div>{user.deskripsi}</div>
                  </td>
                  <td>
                    <button onClick={() => this.editUser(user.id)} className="btn btn-info">
                      <FaEdit /> Update
                    </button>
                    <button
                      style={{ marginLeft: "5px" }}
                      onClick={() => this.deleteUser(user.id)}
                      className="btn btn-danger"
                    >
                      <FaTrash /> Delete
                    </button>
                    <button
                      style={{ marginLeft: "5px" }}
                      onClick={() => this.viewUser(user.id)}
                      className="btn btn-info"
                    >
                      <FaInfo /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3">
            <button className="btn btn-primary" onClick={this.addUser}>
              <FaPlus /> Tambah Data
            </button>
          </div>
        </div>
        <Modal
          isOpen={this.state.isDeleteModalOpen}
          onRequestClose={this.closeDeleteModal}
          contentLabel="Delete Confirmation"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              padding: "10px",
              height: "200px",
              textAlign: "center",
            },
          }}
        >
          <h2>Confirmation</h2>
          <p>Are you sure you want to delete this user?</p>
          <button onClick={this.confirmDelete} className="btn btn-danger">
            Yes
          </button>
          <button onClick={this.closeDeleteModal} className="btn btn-secondary">
            No
          </button>
        </Modal>
      </div>
    );
  }
}

export default ListUserComponent;
