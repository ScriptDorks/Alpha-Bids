<?
include("../../../../include/connection.inc.php");
include("../../../../include/common.inc.php");
$path="../../../../../$cmtdoc";

switch ($call)
{
	case "upload":
		
		$file_name=$_FILES['src']['name'];
		copy($src,"$path/$file_name") or die("errror");
		if(copy($src,"$path/$file_name"))
		{
			//$loadscript="<script> onload=selimage('$file_name'); </script>";
			$loadscript="insertDoc('$file_name','$title','$desc');";
			//mysql_query("insert into cmtdoc values('$title','$desc','$file_name')");
		}
		
		break;
}

?>

<HTML>
	<HEAD>
		<title>Upload Document</title>
		<script language="javascript" type="text/javascript" src="../../tiny_mce_popup.js"></script>
		<script language="javascript">
			var url = tinyMCE.getParam("external_image_list_url");
			if (url != null)
	
		</script>
		<script language="javascript" type="text/javascript">
		<!--
			function myRegexpReplace(in_str, reg_exp, replace_str, opts) {
				if (typeof opts == "undefined")
					opts = 'g';
				var re = new RegExp(reg_exp, opts);
				return in_str.replace(re, replace_str);
			}

			function insertDoc(file_name,title,desc) {
				if(file_name != "")
				{
					if (window.opener) {
						var src         = "../cmtdoc/"+file_name;
						var content     = "<a href='"+src+"' target='_blank' title='"+desc+"'>"+title+"</a>";
	    
					window.opener.tinyMCE.execInstanceCommand(tinyMCE.getWindowArg('editor_id'), 'mceInsertContent', false,content);
					top.close();
				    }
			    }
			}
	

    function cancelAction() {
        top.close();
    }


//-->
		</script>
	</HEAD>
	<body onload="<?=$loadscript;?>">
		<form id="Form1" method="post" runat="server" target="_self" enctype="multipart/form-data">
				<INPUT id="call" type="hidden" value="upload" name="call" runat="server">
				<TABLE cellSpacing="0" cellPadding="0" width="100%" border="0">
					<TR>
						<TD vAlign="middle" align="center">
							<TABLE cellSpacing="0" cellPadding="4" border="0">
								<TR>
									<TD class="title" colSpan="3">Upload Document</TD>
								</TR>
								<TR>
									<TD noWrap align="right">Document URL:</TD>
									<TD colSpan="2">
										<TABLE cellSpacing="0" cellPadding="0" border="0">
											<TR>
												<TD><INPUT id="hsrc" style="WIDTH: 280px" type="hidden" onchange="getImageData();" name="hsrc"
														runat="server"></TD>
												<TD><INPUT id="src" style="WIDTH: 280px" type="file" name="src" runat="server"></TD>
												<TD id="browser"></TD>
											</TR>
										</TABLE>
									</TD>
								</TR> <!-- Document List --->
								<TR>
									<TD noWrap align="right">Document List:</TD>
									<TD colSpan="2"><SELECT id="doc_list" style="WIDTH: 280px" onchange="this.form.hsrc.value=this.value;" name="doc_list"
											runat="server">
											<OPTION value="" selected>---</OPTION>
											<?=show_files();?>
										</SELECT></TD>
								</TR> <!-- Document List --->
								<TR>
									<TD noWrap align="right">Document title:</TD>
									<TD colSpan="2"><INPUT id="title" style="WIDTH: 280px" type="text" name="title" runat="server"></TD>
								</TR>
								<TR>
									<TD noWrap align="right">Document description:</TD>
									<TD colSpan="2"><TEXTAREA id="desc" style="WIDTH: 280px; HEIGHT: 70px" name="desc" runat="server"></TEXTAREA></TD>
								</TR>
								<TR>
									<TD vAlign="bottom" align="center" colSpan="3" height="40"><INPUT id="Insert" style="FONT-WEIGHT: bold" type="button" value="Insert" name="Insert"
											runat="server" onclick="insertDoc(this.form.hsrc.value,this.form.title.value,this.form.desc.value);">&nbsp; <INPUT id="Upload" style="FONT-WEIGHT: bold" type="submit" value="upload" name="Upload"
											runat="server">&nbsp;<INPUT id="cancel" onclick="cancelAction();" type="button" value="Cancel" name="cancel"></TD>
								</TR>
							</TABLE>
						</TD>
					</TR>
				</TABLE>
		</form>
	</body>
</HTML>


<?
/*
function delete()
{
	global $file;
	$root = "../images";
	unlink($root."/".$file);
	show_files();
}*/
function show_files()
{
	global $path;
	$root = $path;
		
	
	if (false !==($handle = opendir($root))) {
	
		$x=0;
	    while (false !== ($file = readdir($handle)))  
		{
			$ext=explode(".",$file);
		 	if ($file <> "." && $file <> "..")
		 	{
		 		if(! is_dir($root."/".$file))
		 		
		 		{	 					
					$filearray[$x]=$file;
		
		 		
		 		}
		  		
			}
			$x++;
		}
		if($filearray<>"")
		{
			sort($filearray);
			reset($filearray);
			foreach($filearray as $key=>$value)
			{
				$file=$value;
			  	echo "<option value='../cmtdoc/$file'>$file</option>";
			}
		}
    closedir($handle); 
   }
	
}
?>
