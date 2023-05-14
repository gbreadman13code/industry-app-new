import * as React from "react";
import Svg, { Mask, Path } from "react-native-svg";
const GlobeSite = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none">
    <Mask
      id="a"
      width={15}
      height={15}
      x={0}
      y={-0.309}
      fill="#000"
      maskUnits="userSpaceOnUse"
    >
      <Path fill="#fff" d="M0-.309h15v15H0z" />
      <Path d="M14 7.85v-.792c-.02-.174-.037-.348-.063-.52-.222-1.532-.881-2.844-1.99-3.924A6.592 6.592 0 0 0 8.364.792c-.25-.042-.503-.067-.755-.1h-.74c-.037.007-.075.019-.114.021a6.524 6.524 0 0 0-2.071.483C1.896 2.344.163 5.208.526 8.243a6.58 6.58 0 0 0 1.706 3.743c1.23 1.346 2.763 2.088 4.587 2.212a6.588 6.588 0 0 0 3.412-.685 6.688 6.688 0 0 0 2.364-1.944 6.627 6.627 0 0 0 1.3-2.938c.044-.258.07-.52.105-.78Zm-3.27-.637a8.722 8.722 0 0 0-.627-3.01l1.851-.91a6.258 6.258 0 0 1 1.57 3.92H10.73Zm-6.355-3.01a8.708 8.708 0 0 0-.63 3.01H.964c-.09-1.103.765-3.214 1.565-3.916l1.847.907Zm6.354 3.495h2.796a6.294 6.294 0 0 1-1.47 3.802 8.74 8.74 0 0 0-1.89-.962 8.761 8.761 0 0 0 .564-2.84ZM.952 7.7h2.796c.031.98.216 1.92.564 2.839-.675.245-1.3.567-1.89.961a6.303 6.303 0 0 1-1.47-3.8Zm6.528-.487V4.645a8.915 8.915 0 0 0 2.16-.333c.385.938.594 1.895.618 2.9H7.48Zm-3.262-.001a8.025 8.025 0 0 1 .62-2.901c.714.206 1.429.31 2.155.336v2.565H4.218Zm2.78 2.82c-.77.02-1.512.142-2.243.357a8.015 8.015 0 0 1-.536-2.691H7v2.334Zm2.724.357a8.794 8.794 0 0 0-2.24-.359V7.7h2.776a8.054 8.054 0 0 1-.536 2.69Zm.263.581a7.932 7.932 0 0 1 1.75.882 6.322 6.322 0 0 1-3.672 1.84 8.728 8.728 0 0 0 1.922-2.722Zm-3.571 2.723c-1.45-.212-2.658-.824-3.673-1.842a7.896 7.896 0 0 1 1.751-.88 8.73 8.73 0 0 0 1.922 2.722Zm-1.477-2.87c.683-.199 1.36-.305 2.055-.325v3.088a8.164 8.164 0 0 1-2.055-2.763Zm4.601.005a8.134 8.134 0 0 1-2.056 2.758v-3.082c.459-.022 1.523.145 2.056.324ZM8.062 1.216c1.381.201 2.542.765 3.532 1.704-.543.342-1.1.615-1.698.816a8.76 8.76 0 0 0-1.834-2.52Zm-1.647 0a8.764 8.764 0 0 0-1.832 2.513c-.397-.098-1.353-.559-1.696-.816a6.316 6.316 0 0 1 3.528-1.697Zm3.028 2.662c-.65.183-1.3.281-1.961.298V1.321a8.16 8.16 0 0 1 1.961 2.557Zm-4.41 0a8.165 8.165 0 0 1 1.962-2.557v2.857a8.131 8.131 0 0 1-1.962-.3Z" />
    </Mask>
    <Path
      fill="#fff"
      d="M14 7.85v-.792c-.02-.174-.037-.348-.063-.52-.222-1.532-.881-2.844-1.99-3.924A6.592 6.592 0 0 0 8.364.792c-.25-.042-.503-.067-.755-.1h-.74c-.037.007-.075.019-.114.021a6.524 6.524 0 0 0-2.071.483C1.896 2.344.163 5.208.526 8.243a6.58 6.58 0 0 0 1.706 3.743c1.23 1.346 2.763 2.088 4.587 2.212a6.588 6.588 0 0 0 3.412-.685 6.688 6.688 0 0 0 2.364-1.944 6.627 6.627 0 0 0 1.3-2.938c.044-.258.07-.52.105-.78Zm-3.27-.637a8.722 8.722 0 0 0-.627-3.01l1.851-.91a6.258 6.258 0 0 1 1.57 3.92H10.73Zm-6.355-3.01a8.708 8.708 0 0 0-.63 3.01H.964c-.09-1.103.765-3.214 1.565-3.916l1.847.907Zm6.354 3.495h2.796a6.294 6.294 0 0 1-1.47 3.802 8.74 8.74 0 0 0-1.89-.962 8.761 8.761 0 0 0 .564-2.84ZM.952 7.7h2.796c.031.98.216 1.92.564 2.839-.675.245-1.3.567-1.89.961a6.303 6.303 0 0 1-1.47-3.8Zm6.528-.487V4.645a8.915 8.915 0 0 0 2.16-.333c.385.938.594 1.895.618 2.9H7.48Zm-3.262-.001a8.025 8.025 0 0 1 .62-2.901c.714.206 1.429.31 2.155.336v2.565H4.218Zm2.78 2.82c-.77.02-1.512.142-2.243.357a8.015 8.015 0 0 1-.536-2.691H7v2.334Zm2.724.357a8.794 8.794 0 0 0-2.24-.359V7.7h2.776a8.054 8.054 0 0 1-.536 2.69Zm.263.581a7.932 7.932 0 0 1 1.75.882 6.322 6.322 0 0 1-3.672 1.84 8.728 8.728 0 0 0 1.922-2.722Zm-3.571 2.723c-1.45-.212-2.658-.824-3.673-1.842a7.896 7.896 0 0 1 1.751-.88 8.73 8.73 0 0 0 1.922 2.722Zm-1.477-2.87c.683-.199 1.36-.305 2.055-.325v3.088a8.164 8.164 0 0 1-2.055-2.763Zm4.601.005a8.134 8.134 0 0 1-2.056 2.758v-3.082c.459-.022 1.523.145 2.056.324ZM8.062 1.216c1.381.201 2.542.765 3.532 1.704-.543.342-1.1.615-1.698.816a8.76 8.76 0 0 0-1.834-2.52Zm-1.647 0a8.764 8.764 0 0 0-1.832 2.513c-.397-.098-1.353-.559-1.696-.816a6.316 6.316 0 0 1 3.528-1.697Zm3.028 2.662c-.65.183-1.3.281-1.961.298V1.321a8.16 8.16 0 0 1 1.961 2.557Zm-4.41 0a8.165 8.165 0 0 1 1.962-2.557v2.857a8.131 8.131 0 0 1-1.962-.3Z"
    />
    <Path
      fill="#fff"
      d="M14 7.85h.206v.014l-.002.014L14 7.851Zm0-.792.204-.024.002.012v.012H14Zm-.063-.52-.203.03v-.001l.204-.03Zm-1.99-3.924-.143.148.144-.148ZM8.364.792 8.397.59l-.034.203Zm-.755-.1V.485h.014l.013.001-.027.204Zm-.74 0L6.83.488l.02-.003h.02V.69Zm-.114.021L6.741.508l.013.205Zm-2.071.483.078.19-.078-.19ZM.526 8.243.73 8.22l-.204.024Zm1.706 3.743-.152.14.152-.14Zm4.587 2.212.013-.206-.013.206Zm3.412-.685-.091-.184.09.184Zm2.364-1.944-.163-.126.163.126Zm1.3-2.938.202.036-.203-.036Zm-3.166-1.418v.206h-.199l-.006-.2.205-.006Zm-.626-3.01-.19.078-.072-.178.171-.084.091.185Zm1.851-.91-.09-.185.141-.07.104.12-.155.135Zm1.57 3.92.206-.01.01.215h-.215v-.206Zm-9.15-3.01.092-.184.172.085-.073.178-.19-.078Zm-.628 3.01.206.006-.007.199h-.2v-.206Zm-2.783 0v.205h-.19l-.015-.19.205-.016Zm1.565-3.916-.136-.154.104-.09.123.06-.09.184Zm8.201 4.401-.206-.006.007-.2h.2v.206Zm2.796 0v-.206h.216l-.01.216-.206-.01Zm-1.47 3.802.158.131-.119.144-.155-.104.115-.17Zm-1.89-.962-.07.194-.195-.072.073-.194.192.072ZM.953 7.7l-.206.01-.01-.215h.216V7.7Zm2.796 0v-.205h.2l.006.199-.206.006Zm.564 2.839.192-.073.074.195-.196.071-.07-.193Zm-1.89.961.114.171-.155.104-.118-.144.159-.13ZM7.48 7.213v.206h-.206v-.206h.206Zm0-2.568h-.206v-.2l.2-.006.006.206Zm2.16-.333-.056-.198.176-.05.07.17-.19.078Zm.618 2.9.206-.004.005.21h-.211v-.205Zm-6.04 0v.205h-.212l.006-.21.206.005Zm.62-2.901-.19-.08.071-.17.177.052-.057.198Zm2.155.336.008-.206.198.007v.199h-.206Zm0 2.565H7.2v.205h-.206v-.205Zm.005 2.82h.206v.2l-.2.006-.006-.206Zm-2.243.357.058.197-.183.054-.068-.178.193-.073Zm-.536-2.691-.206.004-.004-.21h.21v.206Zm2.78 0v-.206h.205v.206h-.206Zm2.723 2.691.193.073-.068.179-.183-.054.058-.198Zm-2.24-.359-.007.206-.2-.006v-.2h.207Zm0-2.33h-.206v-.206h.206v.205Zm2.776 0v-.206h.21l-.004.21-.206-.005Zm-.273 3.27-.187-.084.078-.174.18.065-.07.193Zm1.75.882.115-.17.207.139-.176.176-.146-.145Zm-3.672 1.84.03.204-.63.093.457-.444.143.148Zm-1.65.001.144-.147.457.443-.63-.092.03-.204Zm-3.672-1.842-.146.145-.177-.178.21-.139.113.171Zm1.751-.88-.068-.194.178-.063.078.173-.188.085Zm.445-.148-.187.086-.1-.216.23-.067.057.197Zm2.055-.325-.006-.205.212-.006v.211h-.206Zm0 3.088h.206v.457l-.342-.302.136-.155Zm2.546-2.758.066-.195.217.073-.096.209-.187-.087Zm-2.056 2.758.136.155-.342.299v-.454h.206Zm0-3.082h-.206v-.196l.196-.01.01.206Zm.58-9.288-.144.148L7.46.92l.631.092-.03.204Zm3.532 1.704.142-.15.192.183-.224.14-.11-.173Zm-1.698.816.066.195-.172.058-.08-.163.186-.09Zm-3.481-2.52-.03-.204.631-.092-.458.444-.143-.148ZM4.583 3.729l.185.09-.072.15-.162-.04.05-.2Zm-1.696-.816-.123.165-.196-.147.178-.168.141.15Zm6.556.965.185-.09.11.221-.24.067-.055-.198Zm-1.961.298.005.206-.21.005v-.21h.205Zm0-2.855h-.206V.866l.342.3-.136.155ZM5.033 3.878l-.055.198-.239-.067.11-.222.184.091Zm1.962-2.557-.136-.155.342-.3v.455h-.206Zm0 2.857H7.2v.213l-.213-.007.007-.206Zm6.8 3.673V7.058h.41V7.851h-.41Zm0-.769c-.02-.18-.036-.345-.061-.515l.407-.06c.026.177.043.36.063.527l-.408.048Zm-.061-.515c-.216-1.487-.855-2.758-1.93-3.805l.287-.295c1.141 1.111 1.822 2.465 2.05 4.041l-.407.059Zm-1.93-3.805A6.387 6.387 0 0 0 8.33.995L8.397.59c1.426.24 2.66.87 3.694 1.878l-.287.295ZM8.33.995C8.083.954 7.842.93 7.58.895l.054-.408c.243.033.508.06.762.102l-.068.406Zm-.72-.098H6.868V.486H7.608v.411Zm-.7-.004-.053.012a.576.576 0 0 1-.088.014L6.74.509l.026-.006.062-.014.08.404ZM6.767.92a6.318 6.318 0 0 0-2.007.467l-.156-.38A6.73 6.73 0 0 1 6.74.508l.027.41Zm-2.007.467C2.058 2.5.378 5.277.731 8.22l-.41.049c-.374-3.13 1.413-6.08 4.284-7.262l.156.38ZM.731 8.22a6.374 6.374 0 0 0 1.653 3.628l-.304.278A6.785 6.785 0 0 1 .32 8.268l.41-.049Zm1.653 3.628c1.194 1.307 2.677 2.025 4.448 2.145l-.027.41c-1.877-.126-3.46-.892-4.725-2.277l.304-.278Zm4.448 2.145a6.382 6.382 0 0 0 3.308-.663l.182.369a6.794 6.794 0 0 1-3.517.705l.027-.41Zm3.308-.663a6.483 6.483 0 0 0 2.292-1.886l.326.251a6.894 6.894 0 0 1-2.436 2.004l-.182-.37Zm2.292-1.886a6.422 6.422 0 0 0 1.26-2.848l.405.072a6.832 6.832 0 0 1-1.339 3.027l-.326-.251Zm1.26-2.847c.044-.253.068-.503.104-.773l.408.055c-.034.25-.061.526-.107.789l-.406-.071Zm-3.168-1.377a8.518 8.518 0 0 0-.611-2.938l.381-.155c.391.966.607 2.002.641 3.08l-.411.013Zm-.511-3.2 1.85-.91.182.369-1.85.91-.183-.37Zm2.096-.861a6.464 6.464 0 0 1 1.621 4.045l-.411.02a6.052 6.052 0 0 0-1.52-3.795l.31-.27Zm1.416 4.26h-2.796v-.411h2.796v.411Zm-8.96-3.136a8.502 8.502 0 0 0-.613 2.937l-.412-.014a8.913 8.913 0 0 1 .644-3.08l.381.157Zm-.82 3.136H.964v-.412H3.746v.412Zm-2.987-.19c-.049-.598.156-1.437.463-2.2.306-.763.735-1.502 1.171-1.885l.272.309c-.364.319-.763.985-1.061 1.73-.299.742-.476 1.51-.435 2.013l-.41.034Zm1.86-4.115 1.848.906-.182.37-1.846-.907.18-.37Zm8.111 4.38H13.525v.411H10.73v-.412Zm3.002.215a6.5 6.5 0 0 1-1.518 3.923l-.318-.261a6.088 6.088 0 0 0 1.425-3.682l.41.02Zm-1.792 3.963c-.58-.39-1.189-.7-1.844-.94l.141-.386c.687.251 1.326.577 1.933.985l-.23.341Zm-1.966-1.205c.339-.897.52-1.815.55-2.774l.412.013a8.967 8.967 0 0 1-.577 2.906l-.385-.145ZM.952 7.495H3.748v.411H.952v-.411Zm3.002.199c.03.958.21 1.875.55 2.772l-.385.146a8.928 8.928 0 0 1-.577-2.905l.412-.013Zm.428 3.038c-.658.24-1.27.554-1.846.94l-.229-.343a9.017 9.017 0 0 1 1.934-.984l.141.387Zm-2.12.899a6.508 6.508 0 0 1-1.516-3.92l.411-.02a6.097 6.097 0 0 0 1.424 3.679l-.318.261Zm5.012-4.418V4.645h.412V7.213h-.412Zm.2-2.774a8.709 8.709 0 0 0 2.11-.325l.11.396a9.121 9.121 0 0 1-2.208.34l-.012-.41Zm2.356-.205c.394.96.609 1.942.634 2.974l-.412.01A7.839 7.839 0 0 0 9.45 4.39l.38-.156Zm.428 3.185H7.48v-.412H10.258v.412Zm-6.246-.213a8.23 8.23 0 0 1 .637-2.975l.38.159a7.82 7.82 0 0 0-.606 2.827l-.41-.01Zm.884-3.093A8.652 8.652 0 0 0 7 4.44l-.015.411a9.063 9.063 0 0 1-2.205-.344l.115-.395Zm2.303.534V7.212h-.411V4.647h.411Zm-.206 2.77H4.218v-.411H6.993v.411Zm.01 2.82a8.54 8.54 0 0 0-2.19.35l-.116-.395a8.959 8.959 0 0 1 2.296-.366l.01.412Zm-2.44.225a8.22 8.22 0 0 1-.55-2.76l.412-.009c.02.904.198 1.769.522 2.623l-.385.146Zm-.344-2.97H6.998v.411H4.22v-.411Zm2.985.206V10.032h-.411V7.698h.411Zm2.46 2.889a8.583 8.583 0 0 0-2.189-.35l.013-.412a8.997 8.997 0 0 1 2.293.367l-.117.395Zm-2.388-.557V7.7h.411V10.03h-.411Zm.206-2.536H10.258v.411H7.482v-.411Zm2.982.21a8.26 8.26 0 0 1-.55 2.758l-.384-.145a7.85 7.85 0 0 0 .522-2.623l.412.01Zm-.409 3.073c.64.231 1.233.526 1.795.904l-.23.342a7.728 7.728 0 0 0-1.705-.86l.14-.386Zm1.826 1.22a6.528 6.528 0 0 1-3.788 1.9l-.06-.408a6.117 6.117 0 0 0 3.556-1.783l.292.291ZM7.92 13.545a8.523 8.523 0 0 0 1.878-2.66l.375.17a8.934 8.934 0 0 1-1.967 2.786l-.286-.296Zm-1.536.352c-1.494-.22-2.742-.85-3.789-1.901l.292-.29c.984.987 2.15 1.578 3.557 1.784l-.06.407Zm-3.757-2.218a8.107 8.107 0 0 1 1.797-.902l.137.389a7.699 7.699 0 0 0-1.706.856l-.228-.343Zm2.053-.792a8.524 8.524 0 0 0 1.877 2.659l-.286.295a8.935 8.935 0 0 1-1.967-2.785l.376-.169Zm.2-.261a8.288 8.288 0 0 1 2.106-.333l.012.411a7.878 7.878 0 0 0-2.003.317l-.116-.395Zm2.318-.127V13.585h-.411V10.498h.411Zm-.342 3.242a8.37 8.37 0 0 1-2.106-2.832l.374-.171a7.959 7.959 0 0 0 2.005 2.694l-.273.309Zm2.869-2.826a8.34 8.34 0 0 1-2.107 2.826l-.272-.31a7.928 7.928 0 0 0 2.005-2.689l.374.172Zm-2.449 2.671V10.504h.412V13.586h-.412Zm.196-3.288c.251-.012.65.027 1.042.09a7.32 7.32 0 0 1 1.09.245l-.132.39a6.922 6.922 0 0 0-1.022-.23c-.387-.06-.75-.094-.958-.084l-.02-.41Zm.62-9.286c1.422.208 2.622.79 3.644 1.758l-.283.3c-.96-.91-2.081-1.455-3.421-1.65l.06-.408Zm3.612 2.082c-.556.35-1.127.63-1.742.837l-.132-.39a7.692 7.692 0 0 0 1.655-.795l.219.348Zm-1.993.732a8.554 8.554 0 0 0-1.793-2.462l.287-.296a8.964 8.964 0 0 1 1.876 2.579l-.37.179ZM6.558 1.364a8.558 8.558 0 0 0-1.79 2.455l-.37-.18A8.97 8.97 0 0 1 6.27 1.069l.287.296ZM4.534 3.929c-.221-.055-.576-.203-.909-.363-.333-.16-.673-.347-.861-.488l.247-.33c.154.116.463.288.793.447.33.16.652.29.829.334l-.1.4ZM2.746 2.763a6.521 6.521 0 0 1 3.639-1.751l.06.407a6.11 6.11 0 0 0-3.417 1.644l-.282-.3Zm6.753 1.313a8.128 8.128 0 0 1-2.012.306l-.01-.412a7.717 7.717 0 0 0 1.91-.29l.112.396Zm-2.223.1V1.321h.412V4.176h-.412Zm.342-3.01a8.365 8.365 0 0 1 2.01 2.621l-.37.182a7.953 7.953 0 0 0-1.912-2.494l.272-.309Zm-2.77 2.621a8.37 8.37 0 0 1 2.011-2.62l.272.308A7.96 7.96 0 0 0 5.218 3.97l-.37-.183Zm2.353-2.466V4.178h-.412V1.321h.412Zm-.213 3.063a8.337 8.337 0 0 1-2.01-.308l.111-.396c.635.179 1.263.271 1.912.292l-.013.412Z"
      mask="url(#a)"
    />
  </Svg>
);
export default GlobeSite;