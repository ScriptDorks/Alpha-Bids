<?
session_start();
include("admin/include/connection.inc.php");
include("admin/include/common.inc.php");
$CMS_PAGES_TITLE = getFileContent("thanks.php","title");
$CMS_PAGES_META_KEYWORDS = getFileContent("thanks.php","meta_keywords");
$CMS_PAGES_META_DESCRIPTION = getFileContent("thanks.php","meta_desc");
include("admin/include/front_header.inc.php");
include("admin/include/submenu.inc.php");
?>
<div align="center" valign='top'> 
		<table border="0" class="listingMaintable" width="450" id="table1"> 
		<tr>
			<td width=450>
			<?=getFileContent("thanks.php","content")?>
			</td>
		</tr>
		<tr height="5"><td></td></tr>
		</table>
	</div>
<?
include("admin/include/front_footer.inc.php");
?>