import React, { Component } from "react";
import UserService from "../services/UserService";
import Modal from "react-modal";

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nama: "",
      usia: 0,
      alamat: "",
      jenis_kelamin: "L",
      deskripsi: "",
      isModalOpen: false,
      successMessage: "",
    };

    this.changeNama = this.changeNama.bind(this);
    this.changeUsia = this.changeUsia.bind(this);
    this.incrementUsia = this.incrementUsia.bind(this);
    this.decrementUsia = this.decrementUsia.bind(this);
    this.changeAlamat = this.changeAlamat.bind(this);
    this.changeJenisKelamin = this.changeJenisKelamin.bind(this);
    this.changeDeskripsi = this.changeDeskripsi.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      UserService.getUserById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
          nama: user.nama,
          usia: user.usia,
          alamat: user.alamat,
          jenis_kelamin: user.jenis_kelamin,
          deskripsi: user.deskripsi,
        });
      });
    }
  }

  saveOrUpdateUser = (e) => {
    e.preventDefault();
    let user = {
      nama: this.state.nama,
      usia: this.state.usia,
      alamat: this.state.alamat,
      jenis_kelamin: this.state.jenis_kelamin,
      deskripsi: this.state.deskripsi,
    };

    if (this.state.id === "_add") {
      UserService.createUser(user).then((res) => {
        this.openModal("Pasien Berhasil Ditambahkan");
      });
    } else {
      UserService.updateUser(user, this.state.id).then((res) => {
        this.openModal("Pasien Berhasil Diperbaharui");
      });
    }
  };

  openModal(message) {
    this.setState({
      isModalOpen: true,
      successMessage: message,
    });
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
      successMessage: "",
    });
    this.props.history.push("/users");
  }

  changeNama = (event) => {
    this.setState({ nama: event.target.value });
  };

  changeUsia = (event) => {
    this.setState({ usia: event.target.value });
  };

  incrementUsia() {
    this.setState((prevState) => ({ usia: prevState.usia + 1 }));
  }

  decrementUsia() {
    this.setState((prevState) => ({ usia: prevState.usia - 1 }));
  }

  changeAlamat = (event) => {
    this.setState({ alamat: event.target.value });
  };

  changeJenisKelamin = (event) => {
    this.setState({ jenis_kelamin: event.target.value });
  };

  changeDeskripsi = (event) => {
    this.setState({ deskripsi: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Tambah Pasien</h3>;
    } else {
      return <h3 className="text-center">Update Pasien</h3>;
    }
  }

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Nama: </label>
                    <input
                      placeholder="Nama"
                      name="nama"
                      className="form-control"
                      value={this.state.nama}
                      onChange={this.changeNama}
                    />
                  </div>
                  <div className="form-group">
                    <label>Usia: </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={this.decrementUsia}
                        >
                          -
                        </button>
                      </div>
                      <input
                        type="number"
                        placeholder="Usia"
                        name="usia"
                        className="form-control text-center"
                        value={this.state.usia}
                        onChange={this.changeUsia}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={this.incrementUsia}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Alamat: </label>
                    <input
                      placeholder="Alamat"
                      name="alamat"
                      className="form-control"
                      value={this.state.alamat}
                      onChange={this.changeAlamat}
                    />
                  </div>
                  <div className="form-group">
                    <label>Jenis Kelamin: </label>
                    <select
                      name="jenis_kelamin"
                      className="form-control"
                      value={this.state.jenis_kelamin}
                      onChange={this.changeJenisKelamin}
                    >
                      <option value="L">Laki-Laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>
                  <div className="form-group">
                  <label>Deskripsi: </label>
                  <textarea
                    placeholder="Deskripsi"
                    name="deskripsi"
                    className="form-control"
                    value={this.state.deskripsi}
                    onChange={this.changeDeskripsi}
                  />
                </div>
                <div className="text-center">
                    <button
                      className="btn btn-success"
                      onClick={this.saveOrUpdateUser}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={this.cancel.bind(this)}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Success Modal"
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
              padding: "20px",
              height: "200px",
              textAlign: "center",
            },
          }}
        >
          <h2>Success</h2>
          <p>{this.state.successMessage}</p>
          <button onClick={this.closeModal} className="btn btn-success">
            OK
          </button>
        </Modal>
      </div>
    );
  }
}

export default CreateUserComponent;
