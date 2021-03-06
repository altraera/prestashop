{if isset($orderby) AND isset($orderway)}
<!-- Sort products -->
{if isset($smarty.get.id_category)}
	{assign var='request' value=$link->getPaginationLink('category', $category, 0, true)}
{elseif isset($smarty.get.id_manufacturer)}
	{assign var='request' value=$link->getPaginationLink('manufacturer', $manufacturer, 0, true)}
{elseif isset($smarty.get.id_supplier)}
	{assign var='request' value=$link->getPaginationLink('supplier', $supplier, 0, true)}
{else}
	{assign var='request' value=$link->getPaginationLink(false, false, 0, true)}
{/if}
<form id="productsSortForm" action="{$request}">
	<p class="select">
		<select id="selectPrductSort" onchange="document.location.href = $(this).val();">
			<option value="{$link->addSortDetails($request, 'position', 'desc')|escape:'htmlall':'UTF-8'}" {if $orderby eq 'position'    AND $orderway eq 'DESC' }selected="selected"{/if}>{l s='--'}</option>
			<option value="{$link->addSortDetails($request, 'price', 'asc')|escape:'htmlall':'UTF-8'}" {if $orderby eq 'price'    AND $orderway eq 'ASC' }selected="selected"{/if}>{l s='price: lowest first'}</option>
			<option value="{$link->addSortDetails($request, 'price', 'desc')|escape:'htmlall':'UTF-8'}" {if $orderby eq 'price'    AND $orderway eq 'DESC'}selected="selected"{/if}>{l s='price: highest first'}</option>
			<option value="{$link->addSortDetails($request, 'name', 'asc')|escape:'htmlall':'UTF-8'}" {if $orderby eq 'name'     AND $orderway eq 'ASC' }selected="selected"{/if}>{l s='name: A to Z'}</option>
			<option value="{$link->addSortDetails($request, 'name', 'desc')|escape:'htmlall':'UTF-8'}" {if $orderby eq 'name'     AND $orderway eq 'DESC'}selected="selected"{/if}>{l s='name: Z to A'}</option>
			<option value="{$link->addSortDetails($request, 'quantity', 'desc')|escape:'htmlall':'UTF-8'}" {if $orderby eq 'quantity' AND $orderway eq 'DESC' }selected="selected"{/if}>{l s='in-stock first'}</option>
		</select>
		<label for="selectPrductSort">{l s='sort by'}</label>
	</p>
</form>
<!-- /Sort products -->
{/if}
