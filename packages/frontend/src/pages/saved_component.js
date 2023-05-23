import React from "react";

<>
  <div className="card text-center">
    <div className="card-header p-4">Pregunta 1</div>
    <div className="card-body">
      <h5 className="card-title py-5">
        Aqui va la pregunta 1, donde el user va a elegir una de las siguientes
        opciones
      </h5>
      <div className="row  p-5">
        <div className="col">
          <div className="p-2">
            <a className="btn bg-dark text-white">Opcion 1</a>
          </div>
        </div>
        <div className="col">
          <div className="p-2">
            <a className="btn bg-danger text-white">Opcion 2</a>
          </div>
        </div>
      </div>
      <div className="row  p-5">
        <div className="col">
          <div className="p-2">
            <a className="btn bg-warning text-white">Opcion 1</a>
          </div>
        </div>
        <div className="col">
          <div className="p-2">
            <a className="btn bg-info text-white">Opcion 2</a>
          </div>
        </div>
      </div>

      {/* {endpoint_questionCards.map()} */}
    </div>
    <div className="card-footer text-muted">
      <h5 id="contador"></h5>
    </div>
  </div>
</>;
