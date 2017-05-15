using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class dotnet_excel_index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        DataSet ds = ExcelToDS(Server.MapPath("suppiler.xlsx"));

        DataView dv = ds.Tables[0].DefaultView;


        List<string> list = new List<string>();

        var s = "";

        for(var i = 0; i < dv.Count; i++)
        {
            s += "{\"province\":\"" + dv[i][3].ToString().Replace("省", "").Replace("壮族自治区", "").Replace("维吾尔自治区", "").Replace("自治区", "") + "\"";
            s += ",\"city\":\"" + dv[i][4].ToString().Replace("市", "") + "\"";
            s += ",\"company\":\"" + dv[i][6].ToString() + "\"";
            s += ",\"address\":\"" + dv[i][7].ToString() + "\"";
            s += ",\"mobile\":\"" + dv[i][9].ToString() + "\"";
            s += ",\"tel\":\"" + dv[i][10].ToString() + "\"";
            s += "}";

            list.Add(s);
            s = "";
        }

        result.Text = "[" + String.Join(",", list.ToArray()) + "]";
    }

    public DataSet ExcelToDS(string Path)
    {
        //string strConn = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" + Path + ";" + "Extended Properties=Excel 8.0;";
        string strConn = "Provider=Microsoft.Ace.OleDb.12.0;" + "data source=" + Path + ";Extended Properties='Excel 12.0; HDR=no; IMEX=1'";
        OleDbConnection conn = new OleDbConnection(strConn);
        conn.Open();
        string strExcel = "";
        OleDbDataAdapter myCommand = null;
        DataSet ds = null;
        strExcel = "select * from [sheet1$]";
        myCommand = new OleDbDataAdapter(strExcel, strConn);
        ds = new DataSet();
        myCommand.Fill(ds, "table1");
        conn.Close();
        return ds;
    }
}