// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  title: { type: String, required: true },
  notes: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
});

//voy a sobreescribir el método toJSON que es un serializador,
//que se aplica cuando grabo en la base de datos??
EventoSchema.method("toJSON", function () {
  //con esto solo sobreescribo el toJSON, q no usamos explícitamente pero sí lo usa mongoose implícitamente
  const { __v, _id, ...object } = this.toObject(); //extraeré __v, _id y todo lo demás va a estar almacenado en object
  object.id = _id;
  return object;
});
//lo escribo con function pq necesito referencia al this, que hace refencia al objeto q estoy serializando
//y de ahí extraeré varias cosas (con this tengo acceso a todas las ppdades)

module.exports = model("Evento", EventoSchema);
