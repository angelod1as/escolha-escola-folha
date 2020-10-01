# Escolha a Escola

"Escolha a Escola" (in English "Choose the School") is a tool built using React and Redux that filters through over 135 thousand Brazilian schools — private and public. It can be used to compare indicators — like it's national grades average or the number of students compared to the city's average — or to choose the best school to fit the user needs.

Design by Irapuan Campos, coding by me — with help from Rubens Fernandes.

[See it live clicking here](https://arte.folha.uol.com.br/educacao/buscador-escolha-a-escola/)

![Website printscreen](./readme1.png)

## Development

The spreadsheet that contained all the schools crashed some computers. One of the main issues was splitting this file into several smaller ones. For that, I had to develop a `Node` script that transformed one `xls` file into several `json` files.

[Check this script here](https://github.com/angelod1as/xls-to-json/). I had close to zero Node experience before building this and had to learn all by myself.

After splitting the files, building the interface went through a **lot** of changes requested by the client, some that resulted in total project overhaul. This made me understand the need for **Redux**, as the project's state was starting to confuse more than solve problems.

The result is a lightweight responsive app that only download needed files. If you need to see schools from the west side of São Paulo, it would only load that list with minimal information. After filtering and clicking on chosen school, then the app would request its whole file.

[It's easier to click your way around than to understand my explanation](https://arte.folha.uol.com.br/educacao/buscador-escolha-a-escola/).

![Website printscreen](./readme2.png)
