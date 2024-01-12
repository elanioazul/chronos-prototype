

export class Utilities {

    public static proxyfyURL(url: string): string {
		// if (environment.proxy_config.use_proxy && Utilities.IsExternal(url)) {
		// 	return (
		// 		environment.proxy_config.proxy_address +
		// 		(environment.proxy_config.use_encode_uri
		// 			? encodeURIComponent(url)
		// 			: url)
		// 	);
		// } else {
		// 	return url;
		// }
        return url;
	}
}