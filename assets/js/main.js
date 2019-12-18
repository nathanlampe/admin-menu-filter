import AMF_Phonetic from './utils/phonetic';
import {
	showItemClass,
	hideItemClass,
	adminMenuSearchFieldClass,
	adminMenuFilterName,
	adminMenuSearch
} from './const/amf';
import {
	currentSubMenuClass,
	hasSubMenuClass,
	menuNameClass,
	menuTopClass,
	adminMenuWrapId,
	adminMenuId,
} from './const/wordpress';

/**
 * Admin Menu Filter.
 */
class Admin_Menu_Filter {

	/**
	 * Admin Menu Filter Constructor.
	 */
	constructor() {
		this.adminMenuWrap = document.getElementById( adminMenuWrapId );
		this.adminMenu     = document.getElementById( adminMenuId );
	}

	/**
	 * Initialize Admin Menu Filter.
	 */
	init() {
		this.AMFPhonetic         = new AMF_Phonetic();
		this.createAdminSearchField();
	}

	/**
	 * Create Admin Menu Filter Search Field.
	 */
	createAdminSearchField() {
		this.menuSearchField = document.createElement( 'input' );

		const adminSearchField = new Promise( ( resolve, reject ) => {
			try {
				// Add the classes and attributes to search input and wrapping elements.
				this.menuSearchField.classList.add( adminMenuSearchFieldClass );
				this.menuSearchField.setAttribute( 'name', adminMenuFilterName );
				this.menuSearchField.setAttribute( 'type', 'text' );
				this.menuSearchField.setAttribute( 'value', '' );
				this.menuSearchField.setAttribute( 'placeholder', 'Search Admin Menu' );

				const menuSearch = document.createElement( 'div' );
				menuSearch.setAttribute( 'id', adminMenuSearch );
				menuSearch.append( this.menuSearchField );

				this.adminMenuWrap.prepend( menuSearch );

				resolve( true );
			} catch ( e ) {
				reject( false );
			}
		});

		// Once the search field has been created and added,
		// add the event listeners.
		adminSearchField.then( () => {
			this.addListeners();
		});
	}

	/**
	 * Add event listeners for search field.
	 */
	addListeners() {
		this.menuSearchField.addEventListener( 'keyup', ( e ) => {
			this.searchMenu( e.target.value );
		});
	}

	/**
	 * Perform the admin menu search.
	 *
	 * @param  {string}  searchTerm  Search term.
	 */
	searchMenu( searchTerm ) {
		searchTerm = searchTerm.trim();
		let matchFound = false;

		this.adminMenu.querySelectorAll( 'li.' + menuTopClass ).forEach(( menuTopItem ) => {

			// Reset the top level menu item to initial state.
			this.resetItem( menuTopItem );

			let menuNameDiv  = menuTopItem.querySelector( '.' + menuNameClass );
			let menuName     = menuNameDiv.textContent || menuNameDiv.innerText;
			let subItemMatch = false;

			// Set true if there is a phonetic phrase match.
			matchFound = this.AMFPhonetic.isMatch( searchTerm, menuName );

			// If the admin menu item has a sub-menu, iterate over each sub-item.
			if ( menuTopItem.classList.contains( hasSubMenuClass ) ) {

				let subMenuWrap = menuTopItem.querySelector('ul');
				subMenuWrap.querySelectorAll('li').forEach(( subMenuListItem ) => {
					let subMenuLink = subMenuListItem.querySelector('a');
					if ( subMenuLink ) {
						// Reset sub menu link to initial state.
						this.resetItem( subMenuLink );

						// Get the text of the sub menu link to compare against the search term.
						let subMenuListItemName = subMenuLink.textContent || subMenuLink.text;
						let subMenuWords        = subMenuListItemName.split(' ');

						// Check the sub menu link for a phonetic match to the search term.
						if ( this.AMFPhonetic.isMatch( searchTerm, subMenuListItemName ) ) {
							subItemMatch = true;
							this.showItem( subMenuLink );
						} else {
							// Display the item if we have a top level match
							// but not a sub item match. Sub menu items are
							// hidden by default unless they are in the
							// current selected menu.
							if ( matchFound ) {
								this.showItem( subMenuLink );
							} else {
								this.hideItem( subMenuLink );
							}
						}

						// Reset the sub menu to initial state if there
						// isn't a search term.
						if ( ! searchTerm.length ) {
							this.resetItem( subMenuLink );
						}
					}
				});

				// Reset the sub menu wrap to initial state.
				this.resetItem( subMenuWrap );

				if ( searchTerm.length ) {
					// If we have a sub menu item match, toggle on
					// the display of the entire sub menu. Otherwise,
					// hide the sub menu if it isn't in the current
					// select menu.
					if ( subItemMatch ) {
						if ( ! subMenuWrap.classList.contains( currentSubMenuClass ) ) {
							this.showItem( subMenuWrap );
						} else {
							this.hideItem( subMenuWrap );
						}
					} else {
						if ( ! subMenuWrap.classList.contains( currentSubMenuClass ) ) {
							this.hideItem( subMenuWrap );
						} else {
							this.showItem( subMenuWrap );
						}
					}
				}
			}

			if ( searchTerm.length ) {
				// Hide the entire menu item if we don't have a
				// top level or sub item match.
				if (
					! matchFound &&
					! subItemMatch
				) {
					this.hideItem( menuTopItem );
				} else {
					this.showItem( menuTopItem );
				}
			}
		});
	}

	/**
	 * Show a menu item.
	 *
	 * @param  {Element}  menuItem  Menu Item.
	 */
	showItem( menuItem ) {
		if ( ! menuItem.classList.contains( showItemClass ) ) {
			menuItem.classList.add( showItemClass )
		}
		if ( menuItem.classList.contains( hideItemClass ) ) {
			menuItem.classList.remove( hideItemClass )
		}
	}

	/**
	 * Hide a menu item.
	 *
	 * @param  {Element}  menuItem  Menu Item.
	 */
	hideItem( menuItem ) {
		if ( menuItem.classList.contains( showItemClass ) ) {
			menuItem.classList.remove( showItemClass )
		}
		if ( ! menuItem.classList.contains( hideItemClass ) ) {
			menuItem.classList.add( hideItemClass )
		}
	}

	/**
	 * Reset the menu item.
	 *
	 * @param  {Element}  menuItem  Menu Item.
	 */
	resetItem( menuItem ) {
		if ( menuItem.classList.contains( showItemClass ) ) {
			menuItem.classList.remove( showItemClass )
		}
		if ( menuItem.classList.contains( hideItemClass ) ) {
			menuItem.classList.remove( hideItemClass )
		}
	}
}

/**
 * Initialize the Admin Menu Filter on Document load.
 */
document.addEventListener('DOMContentLoaded', () => {
	const adminMenuFilter = new Admin_Menu_Filter();
	adminMenuFilter.init();
});