/*
    Thanks For Donating:

    Jackson Academy $2
    ziue 20 Norwegian Krone
    $2 TheOneWhoWill
    MaikkunRK 2 euro
    ₹40.00 Arin Sharma
    Levente Gabor Levai HUF 200
    MaikkunRk 2.49euro
    Vxschlxfner 100 euro
    Phoenix 6 euro
    Jessan Rag ₹40.00
    Matt €6.00
    BryceIsBryce $2
    Adison Masih ₹120.00
 */

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
