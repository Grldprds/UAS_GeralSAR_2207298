import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import Modal from "react-modal";

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
      isDeleteModalOpen: false,
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id)
      .then((res) => {
        this.setState({ user: res.data });
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }

  renderDetail(label, value) {
    return (
      <tr key={label}>
        <td>{label}</td>
        <td>{value}</td>
      </tr>
    );
  }

  openDeleteModal() {
    this.setState({ isDeleteModalOpen: true });
  }

  closeDeleteModal() {
    this.setState({ isDeleteModalOpen: false });
  }

  render() {
    const { id, nama, usia, alamat, jenis_kelamin, deskripsi } = this.state.user;

    return (
      <div className="container mt-4">
        <div className="card col-md-8 offset-md-2">
          <h3 className="text-center">Detail Pasien</h3>
          <div className="card-body">
            <table className="table table-bordered">
              <tbody>
                {this.renderDetail("ID:", id)}
                {this.renderDetail("Nama:", nama)}
                {this.renderDetail("Usia:", usia)}
                {this.renderDetail("Alamat:", alamat)}
                {this.renderDetail("Jenis Kelamin:", jenis_kelamin)}
                {this.renderDetail("Deskripsi:", deskripsi)}
              </tbody>
            </table>

            <div className="text-center">
              <Link to={`/add-user/${id}`} className="btn btn-info mr-2">
                Update
              </Link>
              <button onClick={() => this.openDeleteModal()} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={this.state.isDeleteModalOpen}
          onRequestClose={() => this.closeDeleteModal()}
          contentLabel="Delete Confirmation Modal"
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
              height: "300px",
              textAlign: "center",
            },
          }}
        >
          <h2>Delete Confirmation</h2>
          <p>Are you sure you want to delete this user?</p>
          <button onClick={() => this.deleteUser(id)} className="btn btn-danger mr-2">
            Yes
          </button>
          <button onClick={() => this.closeDeleteModal()} className="btn btn-secondary">
            No
          </button>
        </Modal>
      </div>
    );
  }

  deleteUser(id) {
    UserService.deleteUser(id)
      .then(() => {
        this.closeDeleteModal();
        // Redirect to the user list after deletion
        this.props.history.push("/users");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }
}

export default ViewUserComponent;
