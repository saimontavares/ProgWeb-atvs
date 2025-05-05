for (let i=1; i <= 10; i++) {
    document.writeln("<table>")
    document.writeln("<thead><tr><th colspan=2>Produtos de "+i+"</th></tr></thead>")
    document.writeln("<tbody>")
    for (let j=1; j <= 10; j++){
        document.writeln("<tr><td>"+i+"x"+j+"</td><td>"+i*j+"</td></tr>")
    }
    document.writeln("</tbody>")
    document.writeln("</table>")
}