// Jessan Rag - ₹40.00, Matt €6.00

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

const HABITS_PATH: &str = "./habits.json";

#[tauri::command]
fn get_habits() -> String {
    let habits_raw = fs::read_to_string(HABITS_PATH).unwrap();
    habits_raw
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_habits])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
