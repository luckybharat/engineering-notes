import { useEffect, useState } from "react"

export default function ScrollIndicator() {
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percentage = window.scrollY / totalHeight * 100;
            setScrollHeight(percentage);
        };

        document.addEventListener('scroll', onScroll);
        return () => {
            document.removeEventListener('scroll', onScroll);
        }
    }, [])

    return <div>
        <div style={{ position: 'sticky', top: 0, left: 0, background: '#EFEFEF', height: 2, width: '100%', zIndex: 10 }}>
            <div style={{ width: `${scrollHeight}%`, height: 2, background: 'skyblue' }}></div>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis dui nulla. Nullam eget purus erat. Nullam ac justo tempus, sodales elit vel, congue elit. Etiam a posuere magna. Nulla lobortis elementum varius. Nullam sit amet risus egestas, feugiat magna id, interdum metus. Fusce blandit, ligula sed iaculis sagittis, purus mauris scelerisque erat, sit amet porttitor ante nisl vel turpis. Aenean tristique, ex ut venenatis scelerisque, metus sapien condimentum justo, eu malesuada dui massa at dui. Nunc nisl justo, finibus et semper nec, venenatis at justo.

        Vestibulum venenatis iaculis nisl. Quisque bibendum sit amet nisl ut vestibulum. Suspendisse varius massa eget iaculis pellentesque. Vestibulum porttitor, nisi ut tempus dictum, massa sapien ullamcorper magna, ut feugiat purus ipsum eget lorem. Vestibulum et aliquam lacus. Fusce a iaculis velit. Proin porttitor libero quis metus accumsan, ut tincidunt felis pretium.

        Sed efficitur quam id ligula posuere porttitor. Praesent et varius urna. Aliquam sodales tellus odio, quis pretium quam auctor in. Nulla facilisi. Fusce et lectus congue, bibendum quam et, finibus quam. Praesent non pulvinar mi, nec vehicula neque. Phasellus ligula purus, laoreet sed dignissim ut, fermentum sit amet nunc. Integer at aliquam risus. Aliquam pharetra fringilla enim, tincidunt iaculis velit auctor et. Maecenas venenatis maximus elit eu sollicitudin. Vivamus commodo, eros at rutrum iaculis, neque mi egestas odio, vitae pulvinar urna justo at sapien. Vestibulum sit amet cursus ante.

        Sed pharetra volutpat ex commodo dignissim. Etiam sit amet placerat sem, ac auctor massa. In eu quam quis odio porta condimentum. Morbi id luctus lacus. Mauris hendrerit fermentum lorem, a semper diam eleifend vel. Etiam est risus, hendrerit ac pharetra vestibulum, accumsan vitae dolor. Ut id tellus nulla. Praesent lobortis lacinia urna, eu euismod leo lobortis ac.

        Maecenas ex urna, rutrum at odio eu, mollis condimentum mi. Nam pulvinar, lacus eu volutpat fermentum, ex massa cursus dui, sit amet tristique erat felis sed mauris. Morbi quis lorem at enim tincidunt luctus sit amet id orci. Integer mattis ante sit amet libero mattis, ut tincidunt mauris eleifend. Suspendisse gravida condimentum commodo. Proin posuere, libero eu dictum maximus, dui diam dignissim risus, sed tempor orci quam non ligula. Sed a justo nec augue porttitor tristique vitae sit amet ante. Integer fringilla eu sem id accumsan.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis dui nulla. Nullam eget purus erat. Nullam ac justo tempus, sodales elit vel, congue elit. Etiam a posuere magna. Nulla lobortis elementum varius. Nullam sit amet risus egestas, feugiat magna id, interdum metus. Fusce blandit, ligula sed iaculis sagittis, purus mauris scelerisque erat, sit amet porttitor ante nisl vel turpis. Aenean tristique, ex ut venenatis scelerisque, metus sapien condimentum justo, eu malesuada dui massa at dui. Nunc nisl justo, finibus et semper nec, venenatis at justo.

        Vestibulum venenatis iaculis nisl. Quisque bibendum sit amet nisl ut vestibulum. Suspendisse varius massa eget iaculis pellentesque. Vestibulum porttitor, nisi ut tempus dictum, massa sapien ullamcorper magna, ut feugiat purus ipsum eget lorem. Vestibulum et aliquam lacus. Fusce a iaculis velit. Proin porttitor libero quis metus accumsan, ut tincidunt felis pretium.

        Sed efficitur quam id ligula posuere porttitor. Praesent et varius urna. Aliquam sodales tellus odio, quis pretium quam auctor in. Nulla facilisi. Fusce et lectus congue, bibendum quam et, finibus quam. Praesent non pulvinar mi, nec vehicula neque. Phasellus ligula purus, laoreet sed dignissim ut, fermentum sit amet nunc. Integer at aliquam risus. Aliquam pharetra fringilla enim, tincidunt iaculis velit auctor et. Maecenas venenatis maximus elit eu sollicitudin. Vivamus commodo, eros at rutrum iaculis, neque mi egestas odio, vitae pulvinar urna justo at sapien. Vestibulum sit amet cursus ante.

        Sed pharetra volutpat ex commodo dignissim. Etiam sit amet placerat sem, ac auctor massa. In eu quam quis odio porta condimentum. Morbi id luctus lacus. Mauris hendrerit fermentum lorem, a semper diam eleifend vel. Etiam est risus, hendrerit ac pharetra vestibulum, accumsan vitae dolor. Ut id tellus nulla. Praesent lobortis lacinia urna, eu euismod leo lobortis ac.

        Maecenas ex urna, rutrum at odio eu, mollis condimentum mi. Nam pulvinar, lacus eu volutpat fermentum, ex massa cursus dui, sit amet tristique erat felis sed mauris. Morbi quis lorem at enim tincidunt luctus sit amet id orci. Integer mattis ante sit amet libero mattis, ut tincidunt mauris eleifend. Suspendisse gravida condimentum commodo. Proin posuere, libero eu dictum maximus, dui diam dignissim risus, sed tempor orci quam non ligula. Sed a justo nec augue porttitor tristique vitae sit amet ante. Integer fringilla eu sem id accumsan.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis dui nulla. Nullam eget purus erat. Nullam ac justo tempus, sodales elit vel, congue elit. Etiam a posuere magna. Nulla lobortis elementum varius. Nullam sit amet risus egestas, feugiat magna id, interdum metus. Fusce blandit, ligula sed iaculis sagittis, purus mauris scelerisque erat, sit amet porttitor ante nisl vel turpis. Aenean tristique, ex ut venenatis scelerisque, metus sapien condimentum justo, eu malesuada dui massa at dui. Nunc nisl justo, finibus et semper nec, venenatis at justo.

        Vestibulum venenatis iaculis nisl. Quisque bibendum sit amet nisl ut vestibulum. Suspendisse varius massa eget iaculis pellentesque. Vestibulum porttitor, nisi ut tempus dictum, massa sapien ullamcorper magna, ut feugiat purus ipsum eget lorem. Vestibulum et aliquam lacus. Fusce a iaculis velit. Proin porttitor libero quis metus accumsan, ut tincidunt felis pretium.

        Sed efficitur quam id ligula posuere porttitor. Praesent et varius urna. Aliquam sodales tellus odio, quis pretium quam auctor in. Nulla facilisi. Fusce et lectus congue, bibendum quam et, finibus quam. Praesent non pulvinar mi, nec vehicula neque. Phasellus ligula purus, laoreet sed dignissim ut, fermentum sit amet nunc. Integer at aliquam risus. Aliquam pharetra fringilla enim, tincidunt iaculis velit auctor et. Maecenas venenatis maximus elit eu sollicitudin. Vivamus commodo, eros at rutrum iaculis, neque mi egestas odio, vitae pulvinar urna justo at sapien. Vestibulum sit amet cursus ante.

        Sed pharetra volutpat ex commodo dignissim. Etiam sit amet placerat sem, ac auctor massa. In eu quam quis odio porta condimentum. Morbi id luctus lacus. Mauris hendrerit fermentum lorem, a semper diam eleifend vel. Etiam est risus, hendrerit ac pharetra vestibulum, accumsan vitae dolor. Ut id tellus nulla. Praesent lobortis lacinia urna, eu euismod leo lobortis ac.

        Maecenas ex urna, rutrum at odio eu, mollis condimentum mi. Nam pulvinar, lacus eu volutpat fermentum, ex massa cursus dui, sit amet tristique erat felis sed mauris. Morbi quis lorem at enim tincidunt luctus sit amet id orci. Integer mattis ante sit amet libero mattis, ut tincidunt mauris eleifend. Suspendisse gravida condimentum commodo. Proin posuere, libero eu dictum maximus, dui diam dignissim risus, sed tempor orci quam non ligula. Sed a justo nec augue porttitor tristique vitae sit amet ante. Integer fringilla eu sem id accumsan.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis dui nulla. Nullam eget purus erat. Nullam ac justo tempus, sodales elit vel, congue elit. Etiam a posuere magna. Nulla lobortis elementum varius. Nullam sit amet risus egestas, feugiat magna id, interdum metus. Fusce blandit, ligula sed iaculis sagittis, purus mauris scelerisque erat, sit amet porttitor ante nisl vel turpis. Aenean tristique, ex ut venenatis scelerisque, metus sapien condimentum justo, eu malesuada dui massa at dui. Nunc nisl justo, finibus et semper nec, venenatis at justo.

        Vestibulum venenatis iaculis nisl. Quisque bibendum sit amet nisl ut vestibulum. Suspendisse varius massa eget iaculis pellentesque. Vestibulum porttitor, nisi ut tempus dictum, massa sapien ullamcorper magna, ut feugiat purus ipsum eget lorem. Vestibulum et aliquam lacus. Fusce a iaculis velit. Proin porttitor libero quis metus accumsan, ut tincidunt felis pretium.

        Sed efficitur quam id ligula posuere porttitor. Praesent et varius urna. Aliquam sodales tellus odio, quis pretium quam auctor in. Nulla facilisi. Fusce et lectus congue, bibendum quam et, finibus quam. Praesent non pulvinar mi, nec vehicula neque. Phasellus ligula purus, laoreet sed dignissim ut, fermentum sit amet nunc. Integer at aliquam risus. Aliquam pharetra fringilla enim, tincidunt iaculis velit auctor et. Maecenas venenatis maximus elit eu sollicitudin. Vivamus commodo, eros at rutrum iaculis, neque mi egestas odio, vitae pulvinar urna justo at sapien. Vestibulum sit amet cursus ante.

        Sed pharetra volutpat ex commodo dignissim. Etiam sit amet placerat sem, ac auctor massa. In eu quam quis odio porta condimentum. Morbi id luctus lacus. Mauris hendrerit fermentum lorem, a semper diam eleifend vel. Etiam est risus, hendrerit ac pharetra vestibulum, accumsan vitae dolor. Ut id tellus nulla. Praesent lobortis lacinia urna, eu euismod leo lobortis ac.

        Maecenas ex urna, rutrum at odio eu, mollis condimentum mi. Nam pulvinar, lacus eu volutpat fermentum, ex massa cursus dui, sit amet tristique erat felis sed mauris. Morbi quis lorem at enim tincidunt luctus sit amet id orci. Integer mattis ante sit amet libero mattis, ut tincidunt mauris eleifend. Suspendisse gravida condimentum commodo. Proin posuere, libero eu dictum maximus, dui diam dignissim risus, sed tempor orci quam non ligula. Sed a justo nec augue porttitor tristique vitae sit amet ante. Integer fringilla eu sem id accumsan.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis dui nulla. Nullam eget purus erat. Nullam ac justo tempus, sodales elit vel, congue elit. Etiam a posuere magna. Nulla lobortis elementum varius. Nullam sit amet risus egestas, feugiat magna id, interdum metus. Fusce blandit, ligula sed iaculis sagittis, purus mauris scelerisque erat, sit amet porttitor ante nisl vel turpis. Aenean tristique, ex ut venenatis scelerisque, metus sapien condimentum justo, eu malesuada dui massa at dui. Nunc nisl justo, finibus et semper nec, venenatis at justo.

        Vestibulum venenatis iaculis nisl. Quisque bibendum sit amet nisl ut vestibulum. Suspendisse varius massa eget iaculis pellentesque. Vestibulum porttitor, nisi ut tempus dictum, massa sapien ullamcorper magna, ut feugiat purus ipsum eget lorem. Vestibulum et aliquam lacus. Fusce a iaculis velit. Proin porttitor libero quis metus accumsan, ut tincidunt felis pretium.

        Sed efficitur quam id ligula posuere porttitor. Praesent et varius urna. Aliquam sodales tellus odio, quis pretium quam auctor in. Nulla facilisi. Fusce et lectus congue, bibendum quam et, finibus quam. Praesent non pulvinar mi, nec vehicula neque. Phasellus ligula purus, laoreet sed dignissim ut, fermentum sit amet nunc. Integer at aliquam risus. Aliquam pharetra fringilla enim, tincidunt iaculis velit auctor et. Maecenas venenatis maximus elit eu sollicitudin. Vivamus commodo, eros at rutrum iaculis, neque mi egestas odio, vitae pulvinar urna justo at sapien. Vestibulum sit amet cursus ante.

        Sed pharetra volutpat ex commodo dignissim. Etiam sit amet placerat sem, ac auctor massa. In eu quam quis odio porta condimentum. Morbi id luctus lacus. Mauris hendrerit fermentum lorem, a semper diam eleifend vel. Etiam est risus, hendrerit ac pharetra vestibulum, accumsan vitae dolor. Ut id tellus nulla. Praesent lobortis lacinia urna, eu euismod leo lobortis ac.

        Maecenas ex urna, rutrum at odio eu, mollis condimentum mi. Nam pulvinar, lacus eu volutpat fermentum, ex massa cursus dui, sit amet tristique erat felis sed mauris. Morbi quis lorem at enim tincidunt luctus sit amet id orci. Integer mattis ante sit amet libero mattis, ut tincidunt mauris eleifend. Suspendisse gravida condimentum commodo. Proin posuere, libero eu dictum maximus, dui diam dignissim risus, sed tempor orci quam non ligula. Sed a justo nec augue porttitor tristique vitae sit amet ante. Integer fringilla eu sem id accumsan.
    </div>
}