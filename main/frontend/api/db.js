const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
if (!uri) {
  // don't throw during file import — fail at runtime when invoked
  console.warn('MONGODB_URI is not set. Set it in Vercel Environment Variables.');
}

let cached = global.__mongoClientPromise;

if (!cached) {
  cached = global.__mongoClientPromise = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) return cached.conn;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not set');

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      // mongoose 7 has sensible defaults; keep options minimal
    }).then((m) => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { connect, mongoose };
