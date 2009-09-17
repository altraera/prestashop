<?php

class BlockAdvertising extends Module
{
	function __construct()
	{
		$this->name = 'blockadvertising';
		$this->tab = 'Blocks';
		$this->version = 0.1;

		parent::__construct();

		$this->displayName = $this->l('Block advertising');
		$this->description = $this->l('Adds a block to display an advertising');
	}

	function install()
	{
		if (!parent::install())
			return false;
		if (!$this->registerHook('rightColumn') OR !$this->registerHook('leftColumn'))
			return false;
		return true;
	}

	/**
	* Returns module content
	*
	* @param array $params Parameters
	* @return string Content
	*/
	function hookRightColumn($params)
	{
		global $smarty, $protocol_content, $server_host;

		$smarty->assign('image', $protocol_content.$server_host.__PS_BASE_URI__.'/modules/'.$this->name.'/advertising.jpg');
		return $this->display(__FILE__, 'blockadvertising.tpl');
	}

	function hookLeftColumn($params)
	{
		return $this->hookRightColumn($params);
	}

}

?>