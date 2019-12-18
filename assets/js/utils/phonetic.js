import doubleMetaphone from 'double-metaphone';

/**
 * Phonetic helpers.
 */
export default class AMF_Phonetic {

	/**
	 * Convert a string to double metaphone.
	 *
	 * @param    {string}  string  String to convert to double metaphone.
	 *
	 * @returns  {array}           Double metaphone array of string.
	 */
	strToDoubleMetaphone( string ) {
		return doubleMetaphone( string );
	}

	/**
	 * Compare two strings for a double metaphone match.
	 *
	 * @param    {string}  str1  First compare string.
	 * @param    {string}  str2  Second compare string.
	 *
	 * @returns  {boolean}       Returns true if a match was found.
	 */
	isMatch( str1, str2 ) {
		let matchFound = false;
		let dmArray1   = this.strToDoubleMetaphone( str1 );
		let dmArray2   = this.strToDoubleMetaphone( str2 );

		dmArray1.forEach( ( dmStr1 ) => {

			dmArray2.forEach( ( dmStr2 ) => {
				if ( dmStr2.search( dmStr1 ) > -1 ) {
					matchFound = true;
					return true;
				}
			});

			if ( matchFound ) {
				matchFound = true;
				return true;
			}
		});

		return matchFound;
	}
}