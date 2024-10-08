import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Logo: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    // <Svg viewBox="0 0 1281 199" {...props}>
    //   <path
    //     fill={vars.colors.contrast}
    //     d="M247.013 153.096c-2.979 0-5.085-.617-6.318-1.849-1.13-1.233-1.695-3.185-1.695-5.856v-89.22c0-2.672.616-4.624 1.849-5.856 1.233-1.336 3.287-2.004 6.164-2.004h37.753c14.382 0 24.963 3.031 31.744 9.092 6.78 6.061 10.17 15.101 10.17 27.12 0 11.917-3.39 20.906-10.17 26.967-6.678 5.959-17.259 8.938-31.744 8.938h-14.639v24.963c0 2.671-.616 4.623-1.849 5.856-1.233 1.232-3.339 1.849-6.318 1.849h-14.947zm35.288-55.012c4.212 0 7.448-1.13 9.708-3.39 2.362-2.26 3.544-5.65 3.544-10.17 0-4.623-1.182-8.065-3.544-10.325-2.26-2.26-5.496-3.39-9.708-3.39h-12.174v27.275h12.174zM363.071 155.407c-9.656 0-17.412-3.082-23.268-9.245-5.753-6.267-8.629-15.05-8.629-26.351 0-8.629 1.952-16.18 5.855-22.652 4.007-6.472 9.606-11.454 16.797-14.947 7.294-3.595 15.666-5.393 25.117-5.393 7.808 0 14.691.873 20.649 2.62 6.061 1.643 11.608 4.057 16.642 7.242v61.638c0 1.952-.359 3.236-1.079 3.852-.719.617-2.157.925-4.314.925h-15.718c-1.13 0-2.003-.154-2.619-.463-.617-.41-1.13-1.027-1.541-1.849l-2.004-4.622c-2.979 3.184-6.574 5.496-10.786 6.934-4.109 1.541-9.143 2.311-15.102 2.311zm11.558-20.957c4.006 0 7.139-.976 9.399-2.927 2.26-1.952 3.39-4.726 3.39-8.322V99.163c-1.951-.925-4.417-1.387-7.396-1.387-5.445 0-9.811 1.9-13.098 5.701-3.185 3.801-4.777 9.143-4.777 16.026 0 9.965 4.16 14.947 12.482 14.947zM437.679 153.096c-2.98 0-5.086-.617-6.318-1.849-1.233-1.233-1.849-3.185-1.849-5.856V83.907c0-1.849.308-3.082.924-3.698.719-.72 2.157-1.079 4.315-1.079h15.872c1.232 0 2.157.206 2.773.617.719.308 1.13.924 1.233 1.849l.77 4.623c2.877-2.877 6.627-5.137 11.249-6.78 4.726-1.747 9.965-2.62 15.718-2.62 8.321 0 15.05 2.363 20.186 7.088 5.137 4.623 7.705 11.506 7.705 20.649v40.835c0 2.671-.616 4.623-1.849 5.856-1.13 1.232-3.185 1.849-6.164 1.849h-14.947c-2.979 0-5.136-.617-6.472-1.849-1.233-1.233-1.849-3.185-1.849-5.856v-38.832c0-3.082-.668-5.29-2.003-6.626-1.336-1.335-3.442-2.003-6.318-2.003-3.082 0-5.548.822-7.397 2.465-1.746 1.644-2.619 3.904-2.619 6.781v38.215c0 2.671-.617 4.623-1.849 5.856-1.13 1.232-3.185 1.849-6.164 1.849h-14.947zM564.725 155.407c-14.382 0-25.477-3.339-33.285-10.016-7.807-6.677-11.711-16.385-11.711-29.124 0-7.807 1.798-14.69 5.393-20.648 3.596-5.959 8.784-10.582 15.564-13.869 6.883-3.287 14.999-4.931 24.347-4.931 7.088 0 13.047.668 17.875 2.003 4.931 1.336 9.297 3.39 13.098 6.164 1.13.72 1.695 1.644 1.695 2.774 0 .822-.411 1.9-1.233 3.236l-6.318 10.94c-.719 1.439-1.592 2.158-2.619 2.158-.617 0-1.593-.411-2.928-1.233-2.774-1.746-5.393-3.03-7.859-3.852-2.363-.822-5.342-1.233-8.937-1.233-5.137 0-9.297 1.644-12.482 4.931-3.082 3.287-4.623 7.807-4.623 13.56 0 5.856 1.592 10.376 4.777 13.56 3.185 3.082 7.551 4.623 13.098 4.623 3.287 0 6.267-.462 8.938-1.387 2.671-.924 5.393-2.208 8.167-3.852 1.438-.822 2.465-1.233 3.082-1.233.924 0 1.746.719 2.465 2.158l6.934 11.865c.514 1.027.771 1.849.771 2.465 0 .925-.617 1.798-1.849 2.62-4.315 2.774-9.041 4.828-14.177 6.164-5.034 1.438-11.095 2.157-18.183 2.157zM638.004 155.407c-9.657 0-17.413-3.082-23.268-9.245-5.753-6.267-8.63-15.05-8.63-26.351 0-8.629 1.952-16.18 5.856-22.652 4.006-6.472 9.605-11.454 16.796-14.947 7.294-3.595 15.667-5.393 25.118-5.393 7.807 0 14.69.873 20.648 2.62 6.061 1.643 11.609 4.057 16.643 7.242v61.638c0 1.952-.36 3.236-1.079 3.852-.719.617-2.157.925-4.315.925h-15.717c-1.13 0-2.004-.154-2.62-.463-.616-.41-1.13-1.027-1.541-1.849l-2.003-4.622c-2.979 3.184-6.575 5.496-10.787 6.934-4.109 1.541-9.143 2.311-15.101 2.311zm11.557-20.957c4.007 0 7.14-.976 9.4-2.927 2.26-1.952 3.39-4.726 3.39-8.322V99.163c-1.952-.925-4.417-1.387-7.397-1.387-5.444 0-9.81 1.9-13.098 5.701-3.184 3.801-4.777 9.143-4.777 16.026 0 9.965 4.161 14.947 12.482 14.947zM787.963 147.24c.719.822 1.079 1.747 1.079 2.774 0 .924-.308 1.695-.925 2.311-.616.514-1.438.771-2.465.771h-23.885c-1.438 0-2.517-.103-3.236-.308-.616-.309-1.284-.874-2.003-1.695l-20.957-28.508v22.806c0 2.671-.616 4.623-1.849 5.856-1.233 1.232-3.339 1.849-6.318 1.849h-14.947c-2.979 0-5.085-.617-6.318-1.849-1.13-1.233-1.695-3.185-1.695-5.856v-89.22c0-2.672.616-4.624 1.849-5.856 1.233-1.336 3.288-2.004 6.164-2.004h14.947c2.979 0 5.085.668 6.318 2.004 1.233 1.232 1.849 3.184 1.849 5.855v51.622l20.341-26.504c.616-.822 1.284-1.387 2.003-1.695.719-.309 1.798-.463 3.236-.463h23.885c1.027 0 1.797.309 2.311.925.616.514.925 1.233.925 2.157 0 1.028-.36 1.952-1.079 2.774l-26.35 30.203 27.12 32.051zM837.998 155.407c-8.629 0-16.334-1.438-23.114-4.314-6.677-2.877-11.968-7.192-15.872-12.944-3.903-5.753-5.855-12.79-5.855-21.111 0-13.047 3.698-23.012 11.095-29.895 7.396-6.883 18.029-10.324 31.897-10.324 13.561 0 23.834 3.39 30.819 10.17 7.089 6.678 10.633 15.975 10.633 27.891 0 5.137-2.26 7.705-6.78 7.705h-48.386c0 4.417 1.643 7.808 4.931 10.17 3.39 2.363 8.475 3.544 15.255 3.544 4.212 0 7.705-.359 10.479-1.078 2.876-.822 5.753-2.003 8.629-3.544 1.233-.514 2.055-.771 2.465-.771.925 0 1.695.617 2.312 1.849l5.239 9.862c.514 1.028.771 1.798.771 2.312 0 .924-.617 1.798-1.85 2.619-4.211 2.774-8.988 4.777-14.33 6.01-5.342 1.233-11.455 1.849-18.338 1.849zm11.866-48.077c0-3.904-1.13-6.935-3.39-9.092-2.26-2.157-5.651-3.236-10.171-3.236s-7.961 1.13-10.324 3.39c-2.363 2.158-3.544 5.137-3.544 8.938h27.429zM930.417 155.407c-8.63 0-16.797-.873-24.501-2.619-7.705-1.85-13.92-4.418-18.646-7.705-1.746-1.13-2.619-2.312-2.619-3.544 0-.822.308-1.695.924-2.62l7.551-12.019c.822-1.233 1.643-1.849 2.465-1.849.514 0 1.387.359 2.62 1.078 3.801 2.158 8.115 3.904 12.944 5.239 4.828 1.336 9.605 2.004 14.331 2.004 4.828 0 8.372-.719 10.632-2.158 2.363-1.438 3.544-3.749 3.544-6.934 0-3.082-1.284-5.496-3.852-7.242-2.466-1.747-7.14-3.955-14.023-6.626-10.375-3.904-18.491-8.27-24.347-13.099-5.753-4.93-8.629-11.608-8.629-20.032 0-10.17 3.647-17.926 10.941-23.268C907.046 48.67 916.753 46 928.876 46c8.423 0 15.615.77 21.573 2.311 6.061 1.439 11.197 3.699 15.409 6.78 1.747 1.336 2.62 2.569 2.62 3.699 0 .719-.308 1.54-.925 2.465l-7.55 12.02c-.925 1.232-1.747 1.849-2.466 1.849-.513 0-1.387-.36-2.619-1.079-5.959-3.904-13.047-5.855-21.265-5.855-4.418 0-7.808.719-10.171 2.157-2.362 1.438-3.544 3.801-3.544 7.088 0 2.26.617 4.11 1.849 5.548 1.233 1.438 2.877 2.722 4.931 3.852 2.158 1.027 5.445 2.363 9.862 4.007l2.928 1.078c7.602 2.98 13.561 5.856 17.875 8.63 4.418 2.67 7.756 6.009 10.016 10.016 2.26 3.903 3.39 8.834 3.39 14.793 0 9.143-3.441 16.437-10.324 21.881-6.78 5.445-16.796 8.167-30.048 8.167zM1003.53 153.096c-1.54 0-2.72-.257-3.544-.771-.822-.513-1.439-1.541-1.85-3.082l-19.878-66.569c-.205-.616-.308-1.078-.308-1.386 0-1.438 1.027-2.158 3.082-2.158h20.338c1.34 0 2.31.257 2.93.77.62.412 1.03 1.13 1.23 2.158l8.32 34.98 10.48-28.2c.52-1.232 1.03-2.054 1.54-2.465.62-.514 1.65-.77 3.09-.77h9.7c1.44 0 2.42.256 2.93.77.62.41 1.18 1.233 1.7 2.465l10.32 28.2 8.48-34.98c.3-1.027.71-1.746 1.23-2.157.51-.514 1.44-.77 2.77-.77h20.5c2.05 0 3.08.719 3.08 2.157 0 .308-.1.77-.31 1.386l-20.03 66.569c-.41 1.541-1.03 2.569-1.85 3.082-.72.514-1.85.771-3.39.771h-15.1c-1.44 0-2.52-.257-3.24-.771-.72-.616-1.33-1.643-1.85-3.082l-10.17-27.891-10.17 27.891c-.41 1.439-1.03 2.466-1.85 3.082-.72.514-1.79.771-3.23.771h-14.95zM1128.73 155.407c-9.66 0-17.41-3.082-23.27-9.245-5.75-6.267-8.63-15.05-8.63-26.351 0-8.629 1.95-16.18 5.86-22.652 4-6.472 9.6-11.454 16.79-14.947 7.3-3.595 15.67-5.393 25.12-5.393 7.81 0 14.69.873 20.65 2.62 6.06 1.643 11.61 4.057 16.64 7.242v61.638c0 1.952-.36 3.236-1.08 3.852-.72.617-2.15.925-4.31.925h-15.72c-1.13 0-2-.154-2.62-.463-.62-.41-1.13-1.027-1.54-1.849l-2-4.622c-2.98 3.184-6.58 5.496-10.79 6.934-4.11 1.541-9.14 2.311-15.1 2.311zm11.56-20.957c4 0 7.14-.976 9.4-2.927 2.26-1.952 3.39-4.726 3.39-8.322V99.163c-1.96-.925-4.42-1.387-7.4-1.387-5.45 0-9.81 1.9-13.1 5.701-3.18 3.801-4.78 9.143-4.78 16.026 0 9.965 4.17 14.947 12.49 14.947zM1203.18 184.223c-2.98 0-5.08-.616-6.32-1.849-1.13-1.233-1.69-3.185-1.69-5.856V88.222c4.62-3.287 10.43-6.01 17.41-8.167 6.99-2.157 14.28-3.236 21.88-3.236 31.03 0 46.54 13.15 46.54 39.448 0 11.917-3.29 21.419-9.86 28.508-6.58 7.088-15.87 10.632-27.89 10.632-3.39 0-6.68-.411-9.87-1.233-3.08-.821-5.65-1.951-7.7-3.39v25.734c0 2.671-.62 4.623-1.85 5.856-1.23 1.233-3.34 1.849-6.32 1.849h-14.33zm33.44-49.619c4.42 0 7.71-1.643 9.86-4.931 2.26-3.39 3.39-7.91 3.39-13.56 0-6.677-1.33-11.352-4-14.023-2.57-2.773-6.58-4.16-12.02-4.16-3.5 0-6.27.462-8.32 1.387v24.501c0 3.493.97 6.164 2.92 8.013 1.96 1.849 4.68 2.773 8.17 2.773z"
    //   />
    //   <path
    //     fillRule="evenodd"
    //     clipRule="evenodd"
    //     d="M97.556 198.607c-29.192-.022-52.708-7.027-69.138-19.609-16.627-12.733-25.448-30.803-25.448-51.25 0-19.701 8.801-33.907 18.76-43.51 7.805-7.525 16.417-12.344 22.414-15.117-1.356-4.162-3.048-9.61-4.562-15.238-2.025-7.53-4.012-16.366-4.012-22.84 0-7.663 1.67-15.36 6.175-21.34C46.505 3.385 53.671 0 62.291 0c6.737 0 12.457 2.499 16.934 6.81 4.28 4.12 7.13 9.593 9.097 15.298 3.456 10.024 4.802 22.618 5.179 35.187h8.257c.378-12.569 1.723-25.163 5.18-35.187 1.967-5.705 4.815-11.177 9.096-15.298C120.512 2.5 126.231 0 132.968 0c8.621 0 15.786 3.385 20.546 9.703 4.505 5.98 6.176 13.677 6.176 21.34 0 6.474-1.988 15.31-4.013 22.84-1.514 5.628-3.206 11.076-4.562 15.238 5.997 2.773 14.61 7.592 22.414 15.118 9.959 9.602 18.76 23.808 18.76 43.509 0 20.447-8.82 38.517-25.448 51.25-16.43 12.582-39.946 19.587-69.138 19.609h-.147z"
    //     fill="#633001"
    //   />
    //   <path
    //     d="M62.29 7.288c-12.625 0-18.437 9.516-18.437 22.675 0 10.46 6.753 31.408 9.523 39.563.624 1.835-.356 3.844-2.142 4.555-10.119 4.031-39.981 18.789-39.981 52.588 0 35.603 30.347 62.448 86.31 62.491l.066-.001.067.001c55.962-.043 86.309-26.888 86.309-62.491 0-33.799-29.862-48.557-39.981-52.588-1.786-.71-2.765-2.72-2.142-4.555 2.771-8.154 9.524-29.103 9.524-39.563 0-13.16-5.812-22.675-18.438-22.675-18.174 0-22.705 26.007-23.028 53.92-.021 1.863-1.513 3.375-3.357 3.375H88.676c-1.845 0-3.336-1.512-3.358-3.375-.323-27.913-4.853-53.92-23.028-53.92z"
    //     fill="#D1884F"
    //   />
    //   <path
    //     d="M97.696 177.755c-41.118 0-86.372-22.235-86.443-51.018v.134c0 35.632 30.395 62.491 86.443 62.491s86.443-26.859 86.443-62.491v-.134c-.071 28.783-45.325 51.018-86.443 51.018z"
    //     fill="#FEDC90"
    //   />
    //   <path
    //     className="eye"
    //     d="M74.85 117.896c0 9.718-4.546 14.779-10.154 14.779s-10.154-5.061-10.154-14.779 4.546-14.779 10.154-14.779 10.154 5.061 10.154 14.779zM140.851 117.896c0 9.718-4.546 14.779-10.154 14.779s-10.154-5.061-10.154-14.779 4.546-14.779 10.154-14.779 10.154 5.061 10.154 14.779z"
    //     fill="#633001"
    //   />
    // </Svg>
    <Svg  {...props} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="320px" height="50px" viewBox="0 0 320 50" enable-background="new 0 0 320 50" xmlSpace="preserve">  <image id="image0" width="320" height="50" x="0" y="0"
    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUEAAAAyCAYAAADCz2nqAAAAIGNIUk0AAHomAACAhAAA+gAAAIDo
AAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCa
nBgAABv6SURBVHja7Z15fFTl2fd/15mZzGSfAJkZSJicQGRfgkuFViQBK2CpBMorLVIJL2h5i5CA
CugDEuARlPoU0KKU2gZqH9sCLUtFQNQE0VJFISiEPQwR4iRhGbLNZJlzvX+cmZBlZjLZmADn+/mc
zyfn3s59X5NznXu5rvsGFBQUFBQUFBQUFBQUFBTuOijQFQDQBUB3ADFd9epptgrJbq+SClVEA53M
1wG8AOBSoCupoKBwZxJIJRgVGaJ+Ie0n8c/bS69rTN26Y85Lr0IlCDh57D/oJvaG9dQhjE9/6/zZ
wsoHAFwPtLAUFBQUWs198cG/mfawsfyFMV2cH65LZZaczParzFWlXJdd//g7X7lyhfP2rOa4LkG7
AQiBrruCgoJCi0n4gLXauD5vLFu8QNZyzhpuyJ4PdrMkSczMnPXucl63bh0zM3+0ZioDWBzoNigo
KCi0mM5TFq0jjZbnz59fT/Fl7fkH5+bmMjPzvr+v5z179sgRDhuvefo+/vrrr5nLvue54+5hADMC
3Q4FBQWFZpOwxTJfY4xjADx8+PB6SvCDPy7lqVOnyjeVpbx21lD+8ssvmZlZOvk3Xj6lP1ssFpa+
O8hPDtWXAOgZ6PYoKCgo+E3//WzuMvXFGwDYfe3cufOmFryex/81QeRt27bJiq/gEP9m2iAuLCxk
Zmb7vnk85xfJfOT9t3jW6HgGkBnoNrUVBkP3FKMxbrvRaD5qNMZt79ate0qg66SgoNDG9H6/eIPG
aK5VgAC4e/fuvHv3bj5w4ICs+E7/k1c+lcjXrl1jZuYrW57iyeN/zNcOv8u7Vv6MH+4Vyk88EMkA
OCpU9ZdAt6ktMBjMS41GM3u40gNdNwWFu4l2NZHpt6dslO3TrR8VrJruMX5yUm+899IoQKvHlRP7
8cZnjNRhodj+2Tls/uwKzJ2CsOfbUgBAgjEIeUVVOLyk5/b7lp+f2N6CMRpj1wLC+LYqr7AwP979
t8kkJjFLWd7SBgcLURaLxdbebZTbaU4HkOYpjkhItlotlltRj6YQRVHvcDhTJIlGECEJgNggiQ2g
HIBziISdVqslO9B1Vrg9ULdn4ZLAs8oOf9gofECMDscvO2DJz0fq0vdw4Ew5SuxOjB8SiTEfleN8
URUeTwzHrpxSxHXthD/O7AEx6Wl8lnsVGX9/t/pWCIZI0DM3etHaBGYpxVe83S6lAlh7a9qJdmsn
AJhMoseydTrY/FX0RqOYZrdLGQDpyftnWw9wEoAkZindaDRbiHiZ1frdpnYTnsIdQfvZ3jETg0bV
FF+uFxzXOQh7nkvAgD49kVdcjWsVTuRfrYatQoLYRY3zRVUAAFWwHm+88QZ+n/keQrr2Rc+Rz2Da
sy/iB6OnPAFgdKAF1xqIoG9N/O0Es5TFLF1oeDkcvL2pvKIo6g0GcyYgrQWaLRORmTKNRvOaQMtA
oWPTbkqw7/6SBABRXF1ZL/ypH0YiZtQ8pD//IopLa3CuUFZ6wRoBn5+1AwBCtQLuGf4LzJkzB8HB
wSguKqrNP3nyZAD4eaAF1xqYhRzfKYTsQNexI1BRIa0hQmori0k3GsX0QLdFoePSbsNhSdAFw1kN
0mjrhU95pB9o0P/F/XwMAHCmsBL6EBUGxGhxKK8CAFBRxdiyZQsGxEejj1HAw2lv1ysjVKcKKnc4
Ay27FlNZiU1aLaUBLDaMI6JsZT4LMJm6pzK3WgGCCMusVsvaQLdHoePSfnOC1ZWVEOp3NHtEB6F3
cioqKirwyXuvYcsrU9DZFIekkaPwfd4J9PnJPPy4XxjWrVyIg4UGvL5+PYYOHYq3di1HQkICRo8e
jX/96194erg+aO3+q4GWXYux2Sw2k0lMBpDJzEnucCLK1uloQqDr1xFgpqWtLUNWgPkZgW6LQsem
3ZSgU0MqlRNgZ1Vt2EO9wkA9RiMkJBjzVm0GBE1t3O9+/xFmjOmHtRv+DBiHoC+AlJQUHD9+HPHx
8ejcuTNWrVqJLnmbsPQXpsOBVYKUTcQHWlOCa9U12bVwIOp0yLlVK8IdHdfquegtnoiyJYnWCQJy
AMDphJ4IoiBIKcyYJqdRFKCCf7SbElRXVqtYHQQhOKI27MePjIS1lBDG5QgLC6sNt1gssBzLxv9u
+xgIMdSGGwwGjBw5EgUFBXhy4hg8078Ajz3a5aAQVLkhkEIj4gNt9YK5lKHF3/TR0WKiIEjTAKTg
ppmIjRk7BEFYZrVaLEZjnEfzGyJpc3NXS00mUZQkaZprbs79vBxm5Lif1zZSvQkzEr3FEWGT1XrR
k81VDoAd0dHiWkGQkqzW/LWe8nuTDQAUFl5M9pzHvAagenUKDqYJnj5aBoN5KRElea47LWs41eFS
+OOBWrMffZ1om9vsR60WNl++bMnxJTeTKTaJWeWxB01E02XZSmlo8L8jf9SlnXfrSnq7KUFBpbI7
AahCw2vDPjlZjn2/nop3t+2tl/bcuXN47e2/QqijAN3k5uYiI20K1jxSgZ7RYR9SRL/H6Imtt++E
oAv5ZfQ0J4hsqzXfo2Gl/IJJGR6i9ERIZZZSDQZzhstUxAPUrN6rS/mle1itTiRCIrOUajSa5xUW
NlY4ddoneiqbmZOMRvMF971aLUxwv+REkp7ZW62Ezb7qXFxsyYGsEH3gWT4mkyg2VOomkygyS+my
nf9NHA4pBcCmRhImpHr6XQGg7lSHXC5nMkse6+JC7zb7qamR0o3GuB1ENM/7h4dEb21j5jQAqWi8
yq4HOIWZUozGuGlENL2j2IbeKtptdZi0qjIAEEIja8Myt+xBXt5FfH30WG2YxWLB6tWr8UlWNgoK
CgAARUVF2LVrF+bOnYsNz43GHyZUVfQwBD1HM06MuRMUoEytgmhwkegptawAkdFUqf6k8RdXWfom
kq0xmcQkH+3zRW27nU5/TWB8Kg1/WrXTW4xn+01nkue0wrSGYe6pDY9PJcp29xyjo8VE2Vje28fK
aw1TmKUsb7aXTZCOJn9LTmKWtouiqG+6uDuH9rMTLA69BoDVnbrWC/73sXOYNGkSNm7ciJKSEvxp
1Wzs378fW9fMxY8GxyMkJAQJcV3x2xemYILufaydpP8uMkg1TDXjxG+JwC2rzO2NySSKbanc2hpm
6Zb5czMjzWTqntrSF5UIO3zEDW78vMbKzhWT2LgOnhWmq/TaHqxKBVsrnLVEZimrHRVVosMhpbdT
2R2SdhsOn3iCqvrsLbWpo2OiAGDgwIFYtGgRioqKQETo2rUrIiIisHxNJhxXRqCqWzKWPDIIP5o4
G8+MisJvJ5tAhH0k1Myi6acsgRZUXZhphMlkzvAnrU4nrG3tgoc8HOvQiCaTmNRWpj2SxDnk3TVE
z0yZdruUaTSabfKcGWxEfEySOCckRJXtS97ynKnZAg89NmYk1b13DYWTvBSldzicKagzJHa59Hmj
VjZWq8ViMonJzMjyNnRuSt7t6VXkWlzKaI+yOyLt6jbHBGtQTEIUAFy5cgVTpkxpnCjEgFff2Y0F
CxZi6PhZmDPnFN7Z8CbGDghPGbPG4mnoIgJ4BcAQAFkANgP48taKjZMavjDecDiwCYCtdc+jwejg
nWDXUDK7LcqqqlJla7VsA1jfRFK9e0jJjBQigt0uwWiMy1araZ6PhYSd8OwvLdafF3Qm+eqxuXqJ
m9z3RN4WdCin4TybJ0VIRNkAu9KRWNd8ygNJaD/XSlEURf3dYq3Q2uFwOID7AEwD8DKAdwDsAnAE
QN7Zxw2xl5b8DABgtVphs9k8VyKqB2Y/OxtgCa+88goiO5swZo3lIQ9JdQDGxXbSPAagL4BfA/gC
wAUAcyEf2nQH4rO3sC44WIgqLMwnZmECQLa2ey5ZiITkwsJ8IhLiAdrhNSXR4Pr3QrKcx/PKNxFl
Ewnx7kunu7mYYbNZbES8rhXySqqpkY4aDGYvK6XCDu95bw5pvQ+Fa1PUDold83SJXtJ5XJCyWi0W
Ikp2ySLZar2YbLXmT5eviy75ef09B6P5zHP/rwDCPF8JHQ7vK/R3Gs3tCeoADAMwCrLrWlzDMkij
gTrSAFWUAWpDLITgcJQd3A6p0o5Dhw5h7NixHguOH5wEAAgNDcXChQuRlpY2G4ATwH4ABwFU8fr+
akmLwQD0xy858NI/i7D7m1JA7h2uA/A8gBUA/hBowbYxopdwW2Fhfrr7pqjIssNkMicyo9WGxkB9
kw6r1WLR68XpWi2SPPXQmOsranfPx2g0ey3f1yqkwyGs1Wp5WguHi676I8NgMKOoKH9Zg+dmG41x
Ns/tkE1hmhgKu6kdEkuSM9HbEN6X0nXbi3qLMxrjcgCPo47mymVn3VX8wkLLWtf/ihdF72xu+bct
zVKCYcPGzai6mPu7qoI8EBE0MQkI6T8MQfEDoOkWD238AKg7d4WgUpcDuMpyTzP2wqnDqLp0Fpcv
X/brOTNmzMDKlSuDYb+6sH837cLPz9vLKqulvTT7xK5uQFr+Hwf+s3+sbvKuOeaff3O5UvvanmL8
7YsbgHx050YAkwDMBPBdoAXcnhBRTsOwJubTmkt23RubzWJzzacltnfb3F41zMhs/ipqXRkhw2QS
DzScryTinV4UwHgA6U0Nhd24h8TebAMBsvgzVypvFdZ49ZaZbW0kUg914GyApjW3oDsN/5QgM/X6
sGwDgZ4BAHvuIWhje5epIjsfJ8ZRFqRcSRIuCSpnbk1YuPXMUCoBoDHNf/tJVWhEpqALAQCcOXPG
r8eFhoZi0aJFmD9/HnY/EYe+3bRhH+WWTdr+dcmkD74pe1U949s/A8jgd/ouHdQ9OP1/Z8amjh0Y
rn9xWyEKbNUA8CiATyF/QS8GWsjth3v+6CaCoMphltrxmWS7VfOTdbxqUgGe1sQcmVc8z1d6VQCi
KIp6u52n+ddOeUhst0sjPEqLONtbTldvMw1Ait3u3UOmLVCpBIuHUAvQnv8rtwf+KUEiPgP8qtcn
ZW9RDT8e0mvYjp8/Fnoig6ihBM0AZgN4VAiJuL/003+Ehdw3CkExCXCcO4a8vDy/KzZr1iysWLEC
UzdewoqJRgyO1WHc9HDYKpzd1n10ddHvPrk2m2aeXAFgnv2dvmt/OVT/tx/1DBk6dGUerpTWAPJw
4WMA/QFU+v1g/wRiI2qzL7RCE1itlk0ANrl6S4myR4kkEtFgZugBTmyiCFfv7iYOh2qHVuvZtMe1
8prUOIZ2AJzSIFDvSu+xDoIgeLRLNBrFNGZp7a2SoSS1dnHuzqVZw+EzI8OOATgG1Fs/N0AeeqYI
oREPRIycjPBh46AV+10t//agUGk5FcLVsv/w559/7vezdDodXn75ZSx4fh5io9TSaWulsP3IDdir
GcN6hmLaD6PC0/76/er3j5VGBM88uQTAsOo/9F/+2aL4JT9YcR4lDgmQD2V6BsCbbSk0Il7Xgf1S
xUBXoL1wrVZmo0GvTl6UkFJ9zIU2kok8tI/L9jLU9rLTNs2TrQIazSV6nYMNCmo8DJV3yLl1ClDB
N61ZHe4F4M8ALgmhka90fnJRYo/MnP26Xve+W/hm2t7vV88MUkdGV0c/uagsfNRkAPIKcXN6g3Pn
zsWAQUOwbGdx3thB4X95fnT0+SU/jYZaAP702XWMGxyOOY90Wgzg9wCgefrEy/cYNS+lPdq5bjEj
Ay3k9sI9iV8XSXLqA12vW43VarHIHyXvK+OevSy8eo94Susyc2FPbnt6T4XU9RKpS1vskNNcBOHO
2ai3rWmpElwC4CSAX4b98HH0ePuLtWpBd+/F9JHq4j++/MvwR558oNuru2dF9HgwFhrtFq3Yvzbj
3r17/X4IEWHx4sXYe7xUVM88/pLq6eMJAvjekf1C/7o8xQB9iAo5Fx3oEa15BrLdIFQzc1cN7xVa
d09/faCF3Hq8vdyc2PjlpjY7F+X2o3lTFL68RzyUfUDOIzQjDzVSmC4XQ9FzfSibWZjgMi9KJhKS
fZklNQdPH8e78YPpieYqwVAAWwEsByCEDkk6aFrw+8RzT/XJLjv5+b7ge+5PDuoxYHWXX6XHnx0T
9t6JJwxlhJp8dSdjbQFbt25t1gPHjRuHnj17quEaotDM3KOqGSemCCpn/KT7wz+YP7oL8oqrAeAH
7jzbvrLV7sKa1Du0XQ+TujV4f7mZpSyj0ZxuMnVPNRjMmW2wE3OHwWQSRaPRfNRk6t5km3z57QKe
zXGas4OPWi1scuXJboYtZnbDAB875Nis1ovJRUWWHVarJdt9tY0kPY8a7u4P5k38VoKdfv3f3SF7
aExyBb1dfiRrhGXGfeNAtKzzlEUlJQe2fWk/krXw9EPRpe58REF5QkgE1FGyIvz0008bmcpcunTJ
63M1Gg2effZZAHgOwMO15U4/ZVHPzP3JuMSI15/6oR6QbQoBABuzbV0AwBCuxv/83PR9oIXcWojg
a/cXEcAaZrqtFGBDu8KGuFZOswAkus4KuWA0mteYTGJSTIyYaDKJovsyGs3pzNJRHxLM8fGonWgS
stT3PuHNfuTJ8aR4iSS9txwN/YHl+yYXffxlWt1Rg8sfPcl7cpWlyRLvEPxSgr0+5hjn6W8PAHjA
FXQZwAvxG75YLFXZX4tZ+t43FKTtA0/uYTVVZwFAbYgFAEiShMzM+otyBw8e9Pn81NRUBAcHA8Di
hnHqnl1evFrh/AqAe/fWOACLw7QCPnpexL2xQX9yhQ8F0CnQAm8JTZ9J0qGxeQkXjca47QaDOdNg
MGc2fEFdClCsmx5AOrOUVVMjHa17aBOANfA57UFelZZ/w1ve2YI8Xj5cjc2aXOjtds50K3mDoXuK
3d5IBq1BzyxdMBrjsoxG81GX3LyWLW/ycHfgX0+wrHBp2eH98XVC9vXJskdXXj73slR6HWEPPBqk
NfeGxmB+EEC3+k9QXwSAoJiE2qDMzExI0k3rmpKSEp+KUK/XY/To0YDsqdKvbhwlZ8ccOFVu+uev
Y7WQf9Sd3fSauD3z4tA/RvsaPX1yP4D/BnAIwFUA1wCMC7Tgm0NlJTYBZAl0PVqIj14spxAhte6G
rV4UYCsgi6+5P3+Gt+6hcHPyeFeUqmxf8nAreSLajnYxSuekpstt2PO9s2lSCfbdVzrAce6bp50l
1+oGf8lVzvVS6VU1AJQd/ugMaYMRu2JrZJApbj/q/AOfHB1iJaKyIFNcbea8vDxs3Lix9r5Pnz5Y
utT3gtmiRYtARALq725hMEZqdq2f2i12y1elSZHBwpEFj3UZfGxZTwxNCF6lmnniDQAfAPgvAIDs
SfE6gPcDLfjmYLNZbJJEfvoFt6XvcOtp3kICwMyZaEMzH2Zfm5C668g+hsTeFIKvIbF3LxG5LpSN
DowvA+87kSaVoARhPNSahsFBAJu1ve6vAYDLGZP7M3hjkNgfsas/6Bc5euoRyH68QSBiBl1S11GC
ALB69Wo4nfI03sCBA3HgwAFkZXnd+RwPPvggRowYAQATASQAmP6D+JBjjw0MHbT2wyvo01U75fyr
vaNWTTQWkIomambmOgGcBTAWAIJie6HT47+aD2BloIXeEoqLLTlENETeacQzsiN+xzqoyaUM/N4M
obKSJhDBjzm3piAbkTC9qMiyo+m0vl56zwrSl3JvSokQ0TJ0WMgCCB24fm1P08Nh5ght914QdKF1
Q4cCwmldwmCVrte9VgATz403XiGW/kdjjINp/oYo07z1vwmKSTgJYIUj91CFxlhfCV64cAEff/wx
AKBTp04wm81YsWKFz6oMHz4cAFQAvhrUXfenh3uFmCbeG4GPX4jHkp8abCV255vxC0//ucuzJ9dA
nj8MEUIj0elnc4q6Lnhn3LWdG27rg7hle7iLyZIkDAGEeUTY5LqWuXchcTo73lyOa5MHvxShzWax
Wa35qUTC9JZOAbgOYkp2eZo0icOh2uEtruFQ2I2vIbE3L5G6eeX2NdkSW1uZyPj6eNZJZZEkmnC3
ba/fpMcICTgphEYi6v+koeTDvwCS80x18eXrkCrehBDyWOyyrSEX5z5cUV18+aVTYyLeNc5b/7h+
zLTnIsdMGxHxyC96lH66fXHhW88j5MYlHmzWUXGpEwXXqwEACxYswJAhQxAWFobx48dj3bp1eP31
1zFp0iRYrVacP38eJUX5sBeeRuGZQwjlG/jH7O4Y1jMk0hihBoGuf3vZkZuxs8iR+ZktpNThnAVA
Q0QIHvgQwh/6qT1s2OPrtdFdV+WOibzWVFtvF3ydo6FSOROZvVkFeZ2Ub3cKC/PTTSZxh+zZQYOb
WvV0u8oZDGKKfIqc7zxEsDBjJ5Gwo7mmJd69R5qaG+PN8OBd4slLxFP7TCYxG5AymGl8fS8UshEh
B6DpLk+YlFb/AKBlRLSZmZc23pmHbES8TqejVm8AfDvSpA1dwgccoVKXXQSTHmAQY/2pMeHPAkCv
vaWzieh37KwuKFg+9WrZf3YPhLwa+K55Xfbh4D73Pw3wcIBQmX8aFV/tR99Le9HjxjF0ClUhJkqD
HtEa2KsY1ZIEAQSdhhAZLCAmKgjGCDX0ITc7q1fLnRX7T5RJx/IdZV9cqCj/91l7RLXE0QAgBOkQ
/vBEBPcfirChYwtUnUxv26ud6/PH6a8HWshtjWw3p8pu+MV2OfIfhVdjXCH5dj/Y3YM9oEWng+12
f3nrtKvF7ZHd8cijP3Td397tg+2KstxtPb+G+GVI3HtP2SBBpbZrWFvwzWgqrxe3t3QJiJYRyHl9
9x9sV9/7TWTNlcsayNtYvd/lyUXnOz+1pB+BH2F5gwVUWy+i6rvTcJz+GsJ33yJGZUNkRQG05UUI
UQMaFSAxUFkDlNidsN6owdUyJ18td0II15MqMhpB3XpAY4yDVuyHoJ6DoI3rW6QKDt8BSdrH4WH7
Tz9Epf607XajzoFLFgA7mN2eDCRC7pWInnOSpbDwYrw/z1C4PfFXCSrUp028Kfp+eOMeiVXrAIxl
iR0ln/xNY3t/o8px8rA7yXcAskMfHHM5avRTqrAf/VQPUt3DkrM3iG6exMQMqaJUvqrsgCQBggqk
0UDQhUIICQepg6oJuAyi08zSSYHoSLVK/e9zo3TnAy3M9sbfE+c8oRxGfuejKMGW0aYuZX0+tD3K
rE4D+DGAUHX5LCqOZKEkexscJ/6DOvvc3QDwLYDT6jB9fvDgERXangNJlzD4enC/B8tVoZ3Agkog
ySk5IVSqSSqRGEVarrymMXQq/Pp+qg604G41rVGAAFmCg2nI7T5kVPCNogRbRrv41fbcV36fmvD/
IEmPgqg7AFReOA7H6a9R8e3nqMo/hcoLx+HeYqsONQCuACgGUArAAdkT5HPIBs93JSaTmOQyIG4B
ZCGi5Lt93uduQFGCLaPdNxfovadsEKuFhwXmMQAGMHMcALAkoeq706i5UoDqgvOouV4I57VC1JRc
hVRRClRXQaqpQs1Va0FN8aWdkA9VumsxmcRUzyt73pHNImi6ogDvDhQl2DJu+Q4rPfexQe0sG0CC
0BPEPZg4gSR0YaIoANFgDgeRDi7zHQaeOzM67La272srXCuIScyc5t1cpNa8YpnyT393oSjBltFx
t5nKYNk2JoOUQxA8IIqivrwcokpVb+OAu97cQUFBQUFBQUFBQUFBwT/+P3B2IDvlv0sOAAAAJXRF
WHRkYXRlOmNyZWF0ZQAyMDI0LTA5LTI5VDA2OjQzOjI0KzAwOjAwyljCBAAAACV0RVh0ZGF0ZTpt
b2RpZnkAMjAyNC0wOS0yOVQwNjo0MzoyNCswMDowMLsFergAAAAodEVYdGRhdGU6dGltZXN0YW1w
ADIwMjQtMDktMjlUMDY6NDM6MjQrMDA6MDDsEFtnAAAAAElFTkSuQmCC" />
</Svg>
  );
};

export default Logo;