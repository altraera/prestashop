$(document).ready(function()
{
	updateAddressesDisplay(true);
});

//update the display of the addresses
function updateAddressesDisplay(first_view)
{
	// update content of delivery address
	updateAddressDisplay('delivery');

	// update content of invoice address
	//if addresses have to be equals...
	var txtInvoiceTitle = $('#address_invoice li.address_title').html();	
	if ($('input[type=checkbox]#addressesAreEquals:checked').length == 1)
	{
		$('#address_invoice_form:visible').hide('fast');
		$('#address_invoice').html($('#address_delivery').html());
		$('#address_invoice li.address_title').html(txtInvoiceTitle);
	}
	else
	{
		$('#address_invoice_form:hidden').show('fast');
		if ($('select#id_address_invoice').val())
			updateAddressDisplay('invoice');
		else
		{
			$('#address_invoice').html($('#address_delivery').html());
			$('#address_invoice li.address_title').html(txtInvoiceTitle);
		}	
	}
	
	if(!first_view)
		updateAddresses();
		
	return true;
}

function updateAddressDisplay(addressType)
{
	var idAddress = $('select#id_address_' + addressType + '').val();
	$('#address_' + addressType + ' li.address_company').html(addresses[idAddress][0]);
	if(addresses[idAddress][0] == '')
		$('#address_' + addressType + ' li.address_company').hide();
	else
		$('#address_' + addressType + ' li.address_company').show();
	$('#address_' + addressType + ' li.address_name').html(addresses[idAddress][1] + ' ' + addresses[idAddress][2]);
	$('#address_' + addressType + ' li.address_address1').html(addresses[idAddress][3]);
	$('#address_' + addressType + ' li.address_address2').html(addresses[idAddress][4]);
	if(addresses[idAddress][4] == '')
		$('#address_' + addressType + ' li.address_address2').hide();
	else
		$('#address_' + addressType + ' li.address_address2').show();
	$('#address_' + addressType + ' li.address_city').html(addresses[idAddress][5] + ' ' + addresses[idAddress][6]);
	$('#address_' + addressType + ' li.address_country').html(addresses[idAddress][7] + (addresses[idAddress][8] != '' ? ' (' + addresses[idAddress][8] +')' : ''));
	// change update link
	var link = $('#address_' + addressType + ' a.address_update').attr('href');
	var expression = /id_address=\d+/;
	link = link.replace(expression, 'id_address='+idAddress);
	$('#address_' + addressType + ' a.address_update').attr('href', link);
}

function updateAddresses()
{
	var idAddress_delivery = $('select#id_address_delivery').val();
	var idAddress_invoice = $('input[type=checkbox]#addressesAreEquals:checked').length == 1 ? idAddress_delivery : $('select#id_address_invoice').val();
   
   $.ajax({
           type: 'POST',
           url: baseDir + 'order.php',
           async: true,
           cache: false,
           dataType : "json",
           data: 'processAddress=true&step=2&ajax=true&id_address_delivery=' + idAddress_delivery + '&id_address_invoice=' + idAddress_invoice+ '&token=' + static_token ,
           success: function(jsonData)
           {
           		if (jsonData.hasError)
				{
					var errors = '';
					for(error in jsonData.errors)
						//IE6 bug fix
						if(error != 'indexOf')
							errors += jsonData.errors[error] + "\n";
					alert(errors);
				}
			},
      error: function(XMLHttpRequest, textStatus, errorThrown) {console.log(XMLHttpRequest); alert("TECHNICAL ERROR: unable to save adresses \n\nDetails:\nError thrown: " + XMLHttpRequest + "\n" + 'Text status: ' + textStatus);}
       });
}