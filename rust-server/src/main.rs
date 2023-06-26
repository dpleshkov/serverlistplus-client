use actix_files;
use actix_files::NamedFile;
use actix_web::{web, App, HttpServer, Result};
use serde::{Deserialize, Serialize};
use serde_json;
use std::fs;

#[derive(Serialize, Deserialize)]
struct ConfigServer {
    port: u16,
    logging: bool,
    production: bool
}

#[derive(Serialize, Deserialize)]
struct Config {
    server: ConfigServer
}

async fn index() -> Result<NamedFile> {
    Ok(NamedFile::open("../views/index.html")?)
}

async fn app() -> Result<NamedFile> {
    Ok(NamedFile::open("../views/app.html")?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let config: Config = serde_json::from_str(&fs::read_to_string("../config.json").expect("config.json should be readable"))?;

    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index))
            .route("/app", web::get().to(app))
            .service(actix_files::Files::new("/bootstrap/", "../node_modules/bootstrap/dist"))
            .service(actix_files::Files::new("/bootstrap-icons/", "../node_modules/bootstrap-icons/font"))
            .service(actix_files::Files::new("/", "../public"))
    }).bind(("127.0.0.1", config.server.port))?.run().await
}