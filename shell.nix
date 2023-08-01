{ pkgs ? import <nixpkgs> {} }:

with pkgs;

mkShell {
  buildInputs = [
    coreutils
    nodejs_20
    yarn
  ];
  shellHook = ''
    alias run='yarn dev'
  '';
}
