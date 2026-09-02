"use client";

import Link from "next/link";

/* =========================================================
   ICONS
   ========================================================= */

function MessageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 6.5C5 5.12 6.12 4 7.5 4H16.5C17.88 4 19 5.12 19 6.5V13.5C19 14.88 17.88 16 16.5 16H11L7 19V16H7.5C6.12 16 5 14.88 5 13.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 9H15M9 12H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path
        d="M8.5 14C9.4 15.2 10.55 15.8 12 15.8C13.45 15.8 14.6 15.2 15.5 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4L20 8.5L12 13L4 8.5L12 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M5 12L12 16L19 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 16L12 20L19 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M13.5 2.8L5.5 13H11L10.5 21.2L18.5 11H13L13.5 2.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.5 4.5C8.1 3.1 5.7 3.8 5.7 5.8C4 5.7 3 7.3 3.7 8.8C2.5 9.7 2.8 11.7 4.2 12.3C3.4 13.9 4.6 15.7 6.3 15.5C6.2 17.3 8.1 18.3 9.5 17.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.5 4.5C15.9 3.1 18.3 3.8 18.3 5.8C20 5.7 21 7.3 20.3 8.8C21.5 9.7 21.2 11.7 19.8 12.3C20.6 13.9 19.4 15.7 17.7 15.5C17.8 17.3 15.9 18.3 14.5 17.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 5V19M8.5 8.5C9.5 8.5 10 9.2 10 10M15.5 8.5C14.5 8.5 14 9.2 14 10M8.5 14C9.5 14 10 13.3 10 12.5M15.5 14C14.5 14 14 13.3 14 12.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7V12L15.5 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IntelligenceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3V7M12 17V21M3 12H7M17 12H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5.6 5.6L8.4 8.4M15.6 15.6L18.4 18.4M18.4 5.6L15.6 8.4M8.4 15.6L5.6 18.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.5L19 6V11.5C19 15.8 16.2 18.9 12 20.5C7.8 18.9 5 15.8 5 11.5V6L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M9 7L17 12L9 17V7Z" fill="currentColor" />
    </svg>
  );
}

/* =========================================================
   LEFT FLAME
   Screenshot-style:
   top-left → flowing inward/down
   cyan / turquoise / subtle blue
   ========================================================= */

function LeftFlame() {
  return (
    <div
      className="
        pointer-events-none absolute
        left-[-105px] top-[175px]
        hidden h-[390px] w-[600px]
        lg:block
      "
    >
      <svg
        viewBox="0 0 600 390"
        className="h-full w-full overflow-visible"
        fill="none"
      >
        <defs>
          <linearGradient
            id="cyanFlame"
            x1="0"
            y1="40"
            x2="570"
            y2="320"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#07515d" stopOpacity="0.06" />
            <stop offset="0.2" stopColor="#0a9eae" stopOpacity="0.22" />
            <stop offset="0.45" stopColor="#19e6d1" stopOpacity="0.88" />
            <stop offset="0.7" stopColor="#11d1db" stopOpacity="0.62" />
            <stop offset="1" stopColor="#28a9ff" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="cyanFlameSoft"
            x1="0"
            y1="80"
            x2="500"
            y2="330"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#063b48" stopOpacity="0" />
            <stop offset="0.35" stopColor="#00bfd0" stopOpacity="0.34" />
            <stop offset="0.7" stopColor="#19e6d1" stopOpacity="0.18" />
            <stop offset="1" stopColor="#28a9ff" stopOpacity="0" />
          </linearGradient>

          <filter id="cyanGlowSmall">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          <filter id="cyanGlowLarge">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* Very dark outer atmosphere */}

        <path
          d="
            M-40 92
            C55 60 84 132 135 185
            C194 246 229 300 293 295
            C351 290 386 260 438 277
            C490 294 530 325 620 307
          "
          stroke="#00b9ca"
          strokeWidth="28"
          strokeLinecap="round"
          opacity="0.025"
          filter="url(#cyanGlowLarge)"
        />

        {/* Soft broad flame */}

        <path
          d="
            M-30 100
            C42 76 79 132 129 188
            C183 248 222 291 284 289
            C347 287 380 251 435 269
            C492 288 533 318 620 300
          "
          stroke="url(#cyanFlameSoft)"
          strokeWidth="15"
          strokeLinecap="round"
          opacity="0.28"
          filter="url(#cyanGlowSmall)"
        />

        {/* =================================================
            MAIN FABRIC STRANDS
            ================================================= */}

        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 3 -2; 6 1; 2 4; 0 0"
            dur="12s"
            repeatCount="indefinite"
          />

          {/* Bright central strand */}

          <path
            d="
              M-35 92
              C38 69 79 129 130 187
              C184 248 220 292 283 289
              C346 286 379 252 434 270
              C489 288 536 318 620 300
            "
            stroke="url(#cyanFlame)"
            strokeWidth="5.5"
            strokeLinecap="round"
            opacity="0.58"
          />

          {/* Fine strands */}

          <path
            d="
              M-40 75
              C30 54 76 112 126 169
              C181 231 219 276 281 274
              C343 272 378 237 434 255
              C490 274 537 302 620 285
            "
            stroke="#0db9c9"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.38"
          />

          <path
            d="
              M-40 82
              C32 60 77 119 129 177
              C184 238 222 283 285 281
              C347 279 381 245 437 263
              C492 281 540 310 620 293
            "
            stroke="#12d3dc"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />

          <path
            d="
              M-40 90
              C35 68 80 127 132 185
              C187 246 225 290 288 287
              C350 284 384 250 440 268
              C495 286 542 317 620 299
            "
            stroke="#19e6d1"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.52"
          />

          <path
            d="
              M-40 101
              C35 79 81 138 134 195
              C189 255 227 299 290 296
              C353 293 387 259 443 277
              C498 295 544 325 620 307
            "
            stroke="#16ced8"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.44"
          />

          <path
            d="
              M-40 112
              C36 91 82 149 136 205
              C191 265 230 309 293 305
              C356 302 391 268 447 286
              C501 303 548 334 620 316
            "
            stroke="#10b5ca"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.35"
          />

          <path
            d="
              M-40 125
              C37 105 83 161 138 217
              C194 276 233 319 296 315
              C359 311 395 278 451 295
              C506 312 550 342 620 324
            "
            stroke="#148fba"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.27"
          />

          {/* Upper loose strands */}

          <path
            d="
              M-25 51
              C43 38 81 87 127 139
              C176 194 218 237 278 235
              C339 233 377 208 432 226
              C489 244 537 269 620 254
            "
            stroke="#087f9d"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.2"
          />

          <path
            d="
              M-20 62
              C47 47 84 99 132 151
              C180 204 222 249 282 247
              C341 245 380 219 436 238
              C491 256 541 280 620 266
            "
            stroke="#13bfd0"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.25"
          />

          {/* Lower loose strands */}

          <path
            d="
              M-30 145
              C41 127 87 180 142 234
              C199 291 239 337 301 332
              C364 327 399 295 455 312
              C510 329 553 355 620 340
            "
            stroke="#0c98bb"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.25"
          />

          <path
            d="
              M-25 159
              C44 142 91 195 147 249
              C204 305 243 350 306 345
              C369 340 404 309 460 325
              C515 341 556 367 620 351
            "
            stroke="#18c8d5"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.2"
          />
        </g>

        {/* Small cyan particles */}

        <circle cx="153" cy="174" r="1.3" fill="#19e6d1">
          <animate
            attributeName="opacity"
            values="0.1;0.6;0.1"
            dur="4.8s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="220" cy="255" r="1" fill="#28a9ff">
          <animate
            attributeName="opacity"
            values="0.08;0.5;0.08"
            dur="5.5s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="93" cy="118" r="0.9" fill="#19e6d1">
          <animate
            attributeName="opacity"
            values="0.08;0.45;0.08"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

/* =========================================================
   RIGHT FLAME
   Screenshot-style:
   top-right → flowing inward/down
   violet → purple → pink → red/orange
   ========================================================= */

function RightFlame() {
  return (
    <div
      className="
        pointer-events-none absolute
        right-[-115px] top-[168px]
        hidden h-[415px] w-[650px]
        lg:block
      "
    >
      <svg
        viewBox="0 0 650 415"
        className="h-full w-full overflow-visible"
        fill="none"
      >
        <defs>
          {/* Violet → pink → red */}

          <linearGradient
            id="rightFlame"
            x1="650"
            y1="35"
            x2="40"
            y2="340"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#56309b" stopOpacity="0.05" />
            <stop offset="0.2" stopColor="#8b5cf6" stopOpacity="0.38" />
            <stop offset="0.42" stopColor="#c45cff" stopOpacity="0.82" />
            <stop offset="0.6" stopColor="#e74aa2" stopOpacity="0.76" />
            <stop offset="0.78" stopColor="#ff5b38" stopOpacity="0.72" />
            <stop offset="1" stopColor="#f6a723" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="rightFireLower"
            x1="650"
            y1="140"
            x2="50"
            y2="370"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#7139bc" stopOpacity="0" />
            <stop offset="0.3" stopColor="#b450e9" stopOpacity="0.25" />
            <stop offset="0.52" stopColor="#ff4d72" stopOpacity="0.55" />
            <stop offset="0.75" stopColor="#ff632d" stopOpacity="0.72" />
            <stop offset="0.92" stopColor="#f6a723" stopOpacity="0.52" />
            <stop offset="1" stopColor="#f6a723" stopOpacity="0" />
          </linearGradient>

          <filter id="rightGlowSmall">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          <filter id="rightGlowLarge">
            <feGaussianBlur stdDeviation="13" />
          </filter>
        </defs>

        {/* Dark outer atmosphere */}

        <path
          d="
            M675 76
            C594 46 551 108 502 166
            C448 228 412 278 349 273
            C288 268 253 238 193 259
            C132 280 80 316 -20 290
          "
          stroke="#9b4dff"
          strokeWidth="30"
          strokeLinecap="round"
          opacity="0.025"
          filter="url(#rightGlowLarge)"
        />

        {/* Soft broad fabric */}

        <path
          d="
            M675 82
            C600 55 555 111 505 168
            C451 229 416 278 353 273
            C291 268 256 239 196 260
            C136 281 82 316 -20 290
          "
          stroke="url(#rightFlame)"
          strokeWidth="15"
          strokeLinecap="round"
          opacity="0.28"
          filter="url(#rightGlowSmall)"
        />

        {/* Main flame system */}

        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -3 -2; -6 1; -2 4; 0 0"
            dur="13s"
            repeatCount="indefinite"
          />

          {/* Main violet/pink strand */}

          <path
            d="
              M675 82
              C600 55 555 111 505 168
              C451 229 416 278 353 273
              C291 268 256 239 196 260
              C136 281 82 316 -20 290
            "
            stroke="url(#rightFlame)"
            strokeWidth="5.5"
            strokeLinecap="round"
            opacity="0.58"
          />

          {/* =================================================
              VIOLET / PURPLE FINE STRANDS
              ================================================= */}

          <path
            d="
              M675 60
              C605 35 560 86 510 142
              C457 201 420 249 358 244
              C298 239 260 210 201 231
              C141 252 87 286 -18 263
            "
            stroke="#7650dc"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.3"
          />

          <path
            d="
              M675 68
              C605 42 561 94 512 151
              C458 210 422 258 360 253
              C298 248 262 219 203 240
              C143 261 88 296 -18 273
            "
            stroke="#8b5cf6"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.44"
          />

          <path
            d="
              M675 76
              C605 49 563 102 514 159
              C460 218 425 267 363 262
              C301 257 264 228 205 249
              C145 270 90 305 -18 282
            "
            stroke="#a653ed"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />

          <path
            d="
              M675 86
              C607 59 566 112 517 169
              C463 228 428 277 366 272
              C304 267 267 238 208 259
              C148 280 93 315 -18 292
            "
            stroke="#c45cff"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.55"
          />

          <path
            d="
              M675 98
              C608 72 568 124 520 181
              C466 240 430 289 369 284
              C307 279 270 250 211 271
              C151 292 96 327 -18 304
            "
            stroke="#d254c8"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.46"
          />

          {/* =================================================
              PINK / RED STRANDS
              ================================================= */}

          <path
            d="
              M675 111
              C609 85 569 137 521 194
              C467 253 432 302 370 297
              C308 292 272 263 213 284
              C153 305 98 340 -18 317
            "
            stroke="#e84b9d"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.5"
          />

          <path
            d="
              M675 123
              C609 97 569 149 521 206
              C467 265 432 314 370 309
              C308 304 272 275 213 296
              C153 317 98 352 -18 329
            "
            stroke="#ff4d72"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.48"
          />

          {/* =================================================
              LOWER RED / ORANGE FLAME
              ================================================= */}

          <path
            d="
              M675 142
              C610 116 568 168 519 225
              C465 284 429 333 368 328
              C306 323 269 294 210 315
              C150 336 94 371 -18 348
            "
            stroke="url(#rightFireLower)"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.52"
          />

          <path
            d="
              M675 157
              C610 131 568 183 518 240
              C464 299 428 348 367 343
              C305 338 268 309 209 330
              C149 351 93 386 -18 363
            "
            stroke="#ff632d"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />

          <path
            d="
              M675 171
              C610 146 567 198 517 255
              C463 314 427 363 366 358
              C304 353 267 324 208 345
              C148 366 92 401 -18 378
            "
            stroke="#f6a723"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.28"
          />

          {/* =================================================
              UPPER FLOATING STRANDS
              ================================================= */}

          <path
            d="
              M675 28
              C611 9 568 49 523 97
              C475 147 439 192 382 192
              C325 192 286 168 232 187
              C173 207 117 237 14 221
            "
            stroke="#7649c7"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.18"
          />

          <path
            d="
              M675 42
              C612 22 570 64 525 111
              C477 162 441 207 384 207
              C327 207 289 183 235 202
              C176 222 119 252 14 236
            "
            stroke="#a14fe7"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.23"
          />

          {/* =================================================
              LOWER FLOATING STRANDS
              ================================================= */}

          <path
            d="
              M675 190
              C610 167 566 218 516 274
              C462 333 425 382 364 377
              C302 372 264 343 205 364
              C145 385 89 410 -18 396
            "
            stroke="#ff4d72"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.2"
          />

          <path
            d="
              M675 207
              C610 184 565 235 515 291
              C461 350 424 399 363 394
              C301 389 263 360 204 381
              C144 402 88 425 -18 412
            "
            stroke="#f6a723"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.16"
          />
        </g>

        {/* Particles */}

        <circle cx="500" cy="153" r="1.5" fill="#c45cff">
          <animate
            attributeName="opacity"
            values="0.08;0.65;0.08"
            dur="4.7s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="449" cy="244" r="1.1" fill="#ff4d72">
          <animate
            attributeName="opacity"
            values="0.08;0.55;0.08"
            dur="5.2s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="554" cy="108" r="0.9" fill="#8b5cf6">
          <animate
            attributeName="opacity"
            values="0.08;0.5;0.08"
            dur="4.1s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="405" cy="310" r="1.1" fill="#ff632d">
          <animate
            attributeName="opacity"
            values="0.08;0.5;0.08"
            dur="5.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

/* =========================================================
   FEEDBACK CARD
   ========================================================= */

function FeedbackCard({
  icon,
  children,
  className,
  border,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  className: string;
  border: string;
}) {
  return (
    <div
      className={`
        absolute z-30 hidden
        xl:block
        ${className}
      `}
    >
      {/* 3D depth */}

      <div
        className={`
          absolute
          inset-0
          translate-x-1.5
          translate-y-1.5
          rounded-xl
          border
          bg-[#020711]
          opacity-80
          ${border}
        `}
      />

      {/* Card */}

      <div
        className={`
          relative
          w-[218px]
          rounded-xl
          border
          bg-[#050d19]/98
          px-3.5 py-3
          shadow-[0_18px_45px_rgba(0,0,0,0.48),0_5px_0_rgba(0,0,0,0.32)]
          backdrop-blur-md
          transition-all
          duration-300
          hover:-translate-y-1
          hover:bg-[#07111f]
          hover:shadow-[0_24px_55px_rgba(0,0,0,0.55),0_7px_0_rgba(0,0,0,0.35)]
          ${border}
        `}
      >
        <div className="flex items-center gap-3">
          {icon}

          <div className="text-[11px] leading-5 text-slate-300">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CAPABILITY
   ========================================================= */

function Capability({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 px-3">
      <span className="text-loop-cyan">{icon}</span>

      <span className="whitespace-nowrap text-[11px] font-normal text-slate-300 sm:text-xs">
        {children}
      </span>
    </div>
  );
}

/* =========================================================
   ROLE CARD
   ========================================================= */

function RoleCard({
  role,
  description,
  icon,
  border,
  iconBg,
}: {
  role: string;
  description: string;
  icon: React.ReactNode;
  border: string;
  iconBg: string;
}) {
  return (
    <div className="relative">
      {/* 3D depth */}

      <div
        className={`
          absolute
          inset-0
          translate-x-1
          translate-y-1
          rounded-lg
          border
          bg-[#020711]
          opacity-75
          ${border}
        `}
      />

      {/* Main */}

      <div
        className={`
          relative
          flex items-center gap-2.5
          rounded-lg
          border
          bg-[#050d19]
          px-3.5 py-2
          shadow-[0_10px_25px_rgba(0,0,0,0.32),0_3px_0_rgba(0,0,0,0.35)]
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-[0_15px_32px_rgba(0,0,0,0.42),0_5px_0_rgba(0,0,0,0.35)]
          ${border}
        `}
      >
        <div
          className={`
            flex h-8 w-8 shrink-0
            items-center justify-center
            rounded-full
            ${iconBg}
          `}
        >
          {icon}
        </div>

        <div>
          <p className="text-[11px] font-medium text-slate-200">{role}</p>

          <p className="mt-0.5 text-[9px] text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MINI GRAPH
   ========================================================= */

function MiniGraph({ type }: { type: "cyan" | "green" | "purple" | "orange" }) {
  const stroke = {
    cyan: "#19e6d1",
    green: "#35e879",
    purple: "#c45cff",
    orange: "#f6a723",
  }[type];

  return (
    <svg
      width="76"
      height="42"
      viewBox="0 0 76 42"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M2 34C9 34 9 25 16 27C23 29 25 16 32 20C39 24 40 16 46 18C53 20 54 10 60 12C66 14 69 6 74 2"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path d="M2 39C20 37 39 33 74 8V41H2V39Z" fill={stroke} opacity="0.045" />
    </svg>
  );
}

/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard({
  icon,
  label,
  value,
  change,
  graph,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  graph: "cyan" | "green" | "purple" | "orange";
  accent: string;
}) {
  return (
    <div className="relative min-w-0 flex-1">
      {/* 3D depth */}

      <div
        className={`
          absolute
          inset-0
          translate-x-1.5
          translate-y-1.5
          rounded-xl
          border
          bg-[#020711]
          opacity-80
          ${accent}
        `}
      />

      {/* Main card */}

      <div
        className={`
          group
          relative
          min-w-0
          rounded-xl
          border
          bg-[#050d19]
          px-5 py-4
          shadow-[0_16px_40px_rgba(0,0,0,0.42),0_5px_0_rgba(0,0,0,0.35)]
          transition-all duration-300
          hover:-translate-y-1
          hover:bg-[#07111f]
          hover:shadow-[0_24px_55px_rgba(0,0,0,0.52),0_7px_0_rgba(0,0,0,0.4)]
          ${accent}
        `}
      >
        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent" />

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              {icon}
            </div>

            <div className="min-w-0">
              <p className="text-[10px] text-slate-500">{label}</p>

              <p className="mt-1 text-[25px] font-medium tracking-tight text-slate-100">
                {value}
              </p>

              <p
                className={`
                  mt-1 text-[9px]
                  ${
                    graph === "cyan"
                      ? "text-loop-cyan"
                      : graph === "green"
                        ? "text-loop-green"
                        : graph === "purple"
                          ? "text-loop-violet"
                          : "text-loop-amber"
                  }
                `}
              >
                {change}
              </p>
            </div>
          </div>

          <MiniGraph type={graph} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HERO
   ========================================================= */

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#030912]
        px-5
        pb-10
        pt-[95px]
        sm:px-6
        lg:px-8
        lg:pb-12
        lg:pt-[82px]
      "
    >
      {/* =====================================================
          BACKGROUND GRID
          ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-[680px]
          opacity-[0.14]
          [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
          [background-size:80px_80px]
          [mask-image:linear-gradient(to_bottom,black,transparent)]
        "
      />

      {/* =====================================================
          FLAMES
          ===================================================== */}

      <LeftFlame />
      <RightFlame />

      {/* =====================================================
          SMALL AMBIENT PARTICLES
          ===================================================== */}

      <div className="pointer-events-none absolute left-[17%] top-[43%] hidden h-1.5 w-1.5 rounded-full bg-loop-cyan/60 shadow-[0_0_14px_rgba(25,230,209,0.65)] lg:block" />

      <div className="pointer-events-none absolute right-[18%] top-[34%] hidden h-1.5 w-1.5 rounded-full bg-loop-violet/60 shadow-[0_0_14px_rgba(196,92,255,0.65)] lg:block" />

      <div className="pointer-events-none absolute right-[13%] top-[51%] hidden h-1 w-1 rounded-full bg-loop-amber/60 shadow-[0_0_12px_rgba(246,167,35,0.6)] lg:block" />

      {/* =====================================================
          FEEDBACK CARDS
          ===================================================== */}

      <FeedbackCard
        className="right-[3.5%] top-[125px]"
        border="border-loop-cyan/45 hover:border-loop-cyan/75"
        icon={
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-loop-cyan/[0.13] text-loop-cyan shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <SmileIcon />
          </div>
        }
      >
        <span className="block text-slate-200">Amazing product!</span>

        <span className="text-loop-cyan">★★★★★</span>
      </FeedbackCard>

      <FeedbackCard
        className="right-[3%] top-[218px]"
        border="border-loop-purple/45 hover:border-loop-purple/75"
        icon={
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-loop-purple/[0.13] text-loop-violet">
            <MessageIcon />
          </div>
        }
      >
        <span className="block text-slate-200">The dashboard is</span>

        <span className="block text-slate-400">confusing.</span>
      </FeedbackCard>

      <FeedbackCard
        className="right-[3%] top-[311px]"
        border="border-loop-amber/45 hover:border-loop-amber/75"
        icon={
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-loop-amber/[0.13] text-loop-amber">
            <BoltIcon />
          </div>
        }
      >
        <span className="block text-slate-200">Please add export</span>

        <span className="block text-slate-400">to PDF feature.</span>
      </FeedbackCard>

      <FeedbackCard
        className="right-[5%] top-[404px]"
        border="border-loop-blue/45 hover:border-loop-blue/75"
        icon={
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-loop-blue/[0.13] text-loop-blue">
            <LayersIcon />
          </div>
        }
      >
        <span className="block text-slate-200">Love the new</span>

        <span className="block text-slate-400">AI summary!</span>
      </FeedbackCard>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[850px] text-center">
          {/* BADGE */}

          <div
            className="
              inline-flex
              items-center gap-2
              rounded-full
              border border-loop-cyan/40
              bg-loop-cyan/[0.025]
              px-4 py-2
              text-[11px]
              font-medium
              text-loop-cyan
              shadow-[0_0_28px_rgba(25,230,209,0.055)]
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-loop-cyan shadow-[0_0_9px_rgba(25,230,209,0.9)]" />
            AI-powered customer feedback intelligence
          </div>

          {/* MAIN HEADING */}

          <h1
            className="
              mt-6
              text-[48px]
              font-medium
              leading-[1.08]
              tracking-[-0.035em]
              text-slate-100
              sm:text-[54px]
              lg:text-[58px]
            "
          >
            Your customers are talking.
          </h1>

          <h2
            className="
              mt-1
              text-[48px]
              font-medium
              leading-[1.08]
              tracking-[-0.035em]
              text-transparent
              bg-gradient-to-r
              from-loop-cyan
              via-loop-blue
              to-loop-purple
              bg-clip-text
              sm:text-[54px]
              lg:text-[58px]
            "
          >
            LOOP tells you what they mean.
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-5
              max-w-[760px]
              text-[13px]
              font-normal
              leading-6
              text-slate-400
              sm:text-[14px]
            "
          >
            LOOP transforms thousands of customer comments into structured
            intelligence — revealing sentiment, recurring themes, emerging
            problems, feature requests, and the actions your team should
            prioritize next.
          </p>

          {/* BUTTONS */}

          <div
            className="
              mt-6
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
            "
          >
            <Link
              href="/dashboard"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2.5
                rounded-lg
                border border-loop-cyan/50
                bg-loop-cyan
                px-6 py-3
                text-[13px]
                font-semibold
                text-[#03100f]
                shadow-[0_10px_30px_rgba(25,230,209,0.16),0_3px_0_rgba(0,90,84,0.65)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-loop-cyan
                hover:shadow-[0_16px_38px_rgba(25,230,209,0.24),0_4px_0_rgba(0,90,84,0.7)]
              "
            >
              Explore LOOP
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>

            <a
              href="#how-it-works"
              className="
                inline-flex
                items-center
                justify-center
                gap-2.5
                rounded-lg
                border border-white/[0.16]
                bg-[#050d19]/80
                px-6 py-3
                text-[13px]
                font-medium
                text-slate-300
                shadow-[0_10px_28px_rgba(0,0,0,0.28),0_3px_0_rgba(0,0,0,0.45)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-loop-cyan/35
                hover:bg-[#07111f]
                hover:text-white
                hover:shadow-[0_15px_35px_rgba(0,0,0,0.38),0_4px_0_rgba(0,0,0,0.5)]
              "
            >
              <span
                className="
                  flex h-6 w-6
                  items-center justify-center
                  rounded-full
                  border border-loop-cyan/50
                  text-loop-cyan
                "
              >
                <PlayIcon />
              </span>
              See how it works
            </a>
          </div>
        </div>

        {/* ===================================================
            CAPABILITIES
            =================================================== */}

        <div
          className="
            mx-auto
            mt-9
            flex
            max-w-[850px]
            flex-wrap
            items-center
            justify-center
            gap-y-3
          "
        >
          <Capability icon={<BrainIcon />}>AI-Powered Analysis</Capability>

          <span className="hidden h-4 w-px bg-white/[0.1] sm:block" />

          <Capability icon={<ClockIcon />}>Real-time Insights</Capability>

          <span className="hidden h-4 w-px bg-white/[0.1] sm:block" />

          <Capability icon={<IntelligenceIcon />}>
            Actionable Intelligence
          </Capability>

          <span className="hidden h-4 w-px bg-white/[0.1] sm:block" />

          <Capability icon={<ShieldIcon />}>Trusted by Teams</Capability>
        </div>

        {/* ===================================================
            ROLES
            =================================================== */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
          "
        >
          <RoleCard
            role="Admin"
            description="Manage & Control"
            icon={<ShieldIcon />}
            border="border-loop-cyan/35 hover:border-loop-cyan/65"
            iconBg="bg-loop-cyan/[0.08] text-loop-cyan"
          />

          <RoleCard
            role="Analyst"
            description="Analyze & Discover"
            icon={<IntelligenceIcon />}
            border="border-loop-purple/35 hover:border-loop-purple/65"
            iconBg="bg-loop-purple/[0.08] text-loop-violet"
          />

          <RoleCard
            role="Viewer"
            description="View & Support"
            icon={<MessageIcon />}
            border="border-loop-amber/35 hover:border-loop-amber/65"
            iconBg="bg-loop-amber/[0.08] text-loop-amber"
          />
        </div>

        {/* ===================================================
            KPI CARDS
            =================================================== */}

        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          <StatCard
            icon={
              <span className="text-loop-cyan">
                <MessageIcon />
              </span>
            }
            label="Total feedback"
            value="12,480"
            change="↑ 18.4% vs last month"
            graph="cyan"
            accent="border-loop-cyan/45 hover:border-loop-cyan/75"
          />

          <StatCard
            icon={
              <span className="text-loop-green">
                <SmileIcon />
              </span>
            }
            label="Positive sentiment"
            value="72.6%"
            change="↑ 6.2% vs last month"
            graph="green"
            accent="border-loop-green/45 hover:border-loop-green/75"
          />

          <StatCard
            icon={
              <span className="text-loop-violet">
                <LayersIcon />
              </span>
            }
            label="Themes detected"
            value="24"
            change="↑ 4 new themes"
            graph="purple"
            accent="border-loop-purple/45 hover:border-loop-purple/75"
          />

          <StatCard
            icon={
              <span className="text-loop-amber">
                <BoltIcon />
              </span>
            }
            label="Action signals"
            value="17"
            change="↑ 8 urgent"
            graph="orange"
            accent="border-loop-amber/45 hover:border-loop-amber/75"
          />
        </div>
      </div>
    </section>
  );
}
