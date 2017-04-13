<?php
/**
 * Divine Template
 * Date: 12.04.17
 */

function base_url($internal_link)
{
    return 'http://test.com/' . $internal_link;
}

function lang($string)
{
    $strings = array(
        'contact_info' => 'Somewhere around the world, 73',
        'facebook_link' => 'http://www.facebook.com/something',
        'contact_button' => 'Send',
        'contact_email' => 'info@company.com',
        'page_title' => 'About Us',
        'menu_home' => 'Home',
        'menu_about' => 'About Us',
        'menu_contact' => 'Contact Us'
    );
    return $strings [$string];
}
